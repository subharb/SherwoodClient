import React, { Component } from "react";
import { SIGN_IN_ROUTE } from "../routes/urls";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CryptoJS from "crypto-js";
import axios from "axios";
import { Translate, withLocalize } from "react-localize-redux";
import Modal from "./general/modal";
import { Grid, Paper, Typography } from "@mui/material";
import Form from "../components/general/form";
import {
  generateKey,
  encryptData,
  decryptData,
  isUserLoggedIn,
} from "../utils";
import Breadcrumb from "./general/breadcrumb";
import styled from "styled-components";
import { toggleLoading } from "../actions";
import successImage from "../img/7893-confetti-cannons.gif";
import { withRouter, Link } from "react-router-dom";
import Loader from "./Loader";
import { ButtonBack, ButtonContinue } from "./general/mini_components";

const SpanError = styled.span`
  color: red;
`;
const ParaKey = styled.p`
  word-break: break-all;
`;

const SuccessContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const SuccessText = styled.div`
  padding: 1rem;
`;

const StepsHolder = styled.div`
  float: left;
  padding-top: 0.1rem;
  padding-right: 1rem;
`;
const ImageSuccess = styled.img`
  display: block;
  margin: 0 auto;
`;

const PaperPadding = styled(Paper)`
  padding: 1rem;
`;

const forms = {
  personal_info: {
    name: {
      name: "name",
      required: true,
      type: "text",
      label: "register.common.personal_info.name",
      shortLabel: "register.common.personal_info.name",
      validation: "notEmpty",
    },
    surnames: {
      name: "surnames",
      required: true,
      type: "text",
      label: "register.common.personal_info.surnames",
      shortLabel: "register.common.personal_info.surnames",
      validation: "notEmpty",
    },
    email: {
      name: "email",
      required: true,
      type: "text",
      label: "register.common.contact_info.email",
      shortLabel: "register.common.contact_info.email",
      validation: "validEmail",
    },
    phone: {
      name: "phone",
      required: true,
      type: "text",
      label: "register.common.contact_info.phone",
      shortLabel: "register.common.contact_info.phone",
      validation: "validPhone",
    },
    country: {
      name: "country",
      required: true,
      type: "select",
      defaultOption: { text: "register.common.clinic.country", value: "" },
      options: [],
      option: {
        value: "id",
        text: "code",
      },
      optionsUrl: import.meta.env.VITE_APP_API_URL + "/countries",
      label: "register.common.clinic.country",
      shortLabel: "register.common.clinic.country",
      validation: "notEmpty",
    }
  },
  password: {
    password: {
      name: "password",
      required: true,
      type: "password",
      label: "register.common.password.password",
      shortLabel: "register.common.password.password",
      validation: "textMin6",
    },
    repeat_password: {
      name: "repeat_password",
      required: true,
      type: "password",
      label: "register.common.password.repeat_password",
      shortLabel: "register.common.password.repeat_password",
      validation: "equalTo",
      validationField: "password",
    },
  },
  functionalities: {
    basic: {
      name: "basic",
      required: false,
      type: "checkbox",
      disabled: true,
      defaultValue: true,
      label: "register.common.functionalities.basic",
      explanation: "register.common.functionalities.basic_explanation",
    },
    inpatients: {
      name: "inpatients",
      required: false,
      type: "checkbox",
      label: "register.common.functionalities.inpatients",
      explanation: "register.common.functionalities.inpatients_explanation",
    },
    pharmacy: {
      name: "pharmacy",
      required: false,
      type: "checkbox",
      label: "register.common.functionalities.pharmacy",
      explanation: "register.common.functionalities.pharmacy_explanation",
    },
    requests: {
      name: "requests",
      required: false,
      type: "checkbox",
      label: "register.common.functionalities.requests",
      explanation: "register.common.functionalities.requests_explanation",
    },
  },
  key_generation: {
    cloudflareToken: {
      name: "cloudflareToken",
      required: true,
      type: "cloudflare",
      label: "register.common.personal_info.cloudflare",
      shortLabel: "register.common.personal_info.cloudflare",
      validation: "notEmpty",
    },
    confirm: {
      name: "confirm",
      required: true,
      type: "checkbox",
      label: "register.common.key_generation.confirm",
      shortLabel: "register.key_generation.confirm",
    },
    policy: {
      name: "policy",
      required: true,
      type: "checkbox",
      label: {
        label: "register.common.accept-policy",
        url: "https://www.sherwood.science/privacy-policy",
      },
      shortLabel: "register.common.accept-policy",
      validation: "notEmpty",
    },
  },
};
class Register extends Component {
  constructor(props) {
    super(props);
    this.iv = null;
    this.sections =
      props.typeUser === "researcher"
        ? ["personal_info", "functionalities", "password", "key_generation"]
        : ["password", "key_generation"];

    this.state = {
      selected: props.initialState ? props.initialState.selected : 0,
      info: {},
      key: null,
      success: false,
      errorMessage: null,
      loading: false,
    };

    this.generateKey = this.generateKey.bind(this);
    this.saveData = this.saveData.bind(this);
    this.continue = this.continue.bind(this);
  }
  crumbSelected(index) {
    console.log(`Index selected ${index}`);
  }
  backStep() {
    this.setState({ selected: this.state.selected - 1 });
  }
  componentDidMount() {
    this.generateKey();
  }
  async saveData(data) {
    let tempState = this.state;
    tempState.loading = true;
    this.setState(tempState);
    //Si es el último caso
    if (tempState.selected === this.sections.length - 1) {
      this.props.toggleLoading();
      //Trato los datos que voy a enviar
      delete tempState.info.repeat_password;
      const hashPassword = CryptoJS.SHA256(tempState.info.password).toString(
        CryptoJS.enc.Base64
      );
      //Hay que guardar tb el this.iv
      tempState.info.keyEncrypted = await encryptData(
        tempState.key,
        tempState.info.password
      ); //await this.encodeKeyResearcher(tempState.info.password, this.state.key);
      tempState.info.password = hashPassword;
      console.log(JSON.stringify(tempState.info));
      let response = null;

      if (this.props.typeUser === "researcher") {
        const url = import.meta.env.VITE_APP_API_URL + "/researcher/register";
        const postInfo = { ...tempState.info, cloudflareToken: data.cloudflareToken };
        tempState.info.language = this.props.activeLanguage.code;
        response = await axios.post(url, postInfo).catch((err) => {
          console.log("Catch", err);
          return err;
        });
      } else if (
        this.props.typeUser === "patient" &&
        typeof this.props.match.params.uuidPatient !== undefined
      ) {
        response = await axios
          .put(
            import.meta.env.VITE_APP_API_URL +
              "/patient/register/" +
              this.props.match.params.uuidPatient,
            tempState.info
          )
          .catch((err) => {
            console.log("Catch", err);
            return err;
          });
      } else {
        //Si no es ninguno de los dos algo raro pasa.
        throw "Error";
      }

      if (response.request.status === 200) {
        tempState.success = true;
      } else {
        tempState.success = false;
        if (response.request.status === 401) {
          tempState.errorMessage = "email_error";
        } else if (response.request.status === 402) {
          tempState.errorMessage = "account_registered";
        } else {
          tempState.errorMessage = "account_registered";
        }
      }
      this.props.toggleLoading();
    } else {
      tempState.info = data;
      tempState.selected++;
    }
    tempState.loading = false;
    this.setState(tempState);
  }
  async generateKey() {
    const researcherKey = await generateKey();
    console.log("researcherKey", researcherKey);
    let tempState = { ...this.state };
    tempState.key = researcherKey;
    this.setState(tempState);
  }

  async continue() {
    console.log("Success!");
    this.setState({ success: false });
    //this.props.history.push(SIGN_IN_ROUTE);
    this.props.history.push({
      pathname: SIGN_IN_ROUTE,
      state: {
        from: this.props.location.pathname,
      },
    });
  }
  render() {
    console.log("Register!");
    const currentSection = this.sections[this.state.selected];

    let content = [];
    if (this.state.loading) {
      return <Loader />;
    } else {
      const buttonBack =
        this.state.selected > 0 ? (
          <ButtonBack spaceright onClick={() => this.backStep()}>
            Back
          </ButtonBack>
        ) : null;

      if (this.sections[this.state.selected] === "key_generation") {
        content = [
          <ParaKey>
            <Translate id="register.common.key_generation.encription_key" />:{" "}
            {this.state.key}
          </ParaKey>,
        ];
      }

      content.push(
        <Form
          fields={forms[currentSection]}
          fullWidth
          key="form"
          initialData={this.state.info}
          callBackForm={this.saveData}
          customButton={buttonBack}
          submitText={"investigation.show.accept_consents.continue"}
        />
      );
      return [
        <Modal
          key="modal"
          open={this.state.success}
          title={<Translate id="register.researcher.success.title" />}
          confirmAction={this.continue}
        >
          <SuccessContainer>
            <ImageSuccess src={successImage} width="200" alt="Success!" />
            <Typography variant="body2" gutterBottom>
              <Translate id={`register.researcher.success.description`} />
            </Typography>
          </SuccessContainer>
        </Modal>,
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StepsHolder>Steps : </StepsHolder>
            <Breadcrumb
              callBack={this.crumbSelected}
              selected={this.state.selected}
              stages={this.sections.map((section) => {
                return this.props.translate("breadcrumb." + section);
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              style={{ fontWeight: "900" }}
              variant="subtitle1"
              color="textPrimary"
            >
              <Translate
                id={`register.${this.props.typeUser}.${currentSection}.title`}
              />
            </Typography>
            <Typography variant="body2" color="textPrimary">
              <Translate
                id={`register.${this.props.typeUser}.${currentSection}.explanation`}
                options={{ renderInnerHtml: true }}
              />
            </Typography>
          </Grid>
          <Grid item xs={12} padding={1}>
            <PaperPadding>
              {content}
              {this.state.errorMessage && (
                <SpanError>
                  <Translate
                    id={`register.${this.props.typeUser}.error.${this.state.errorMessage}`}
                  />
                </SpanError>
              )}
            </PaperPadding>
          </Grid>
        </Grid>,
      ];
    }
  }
}

Register.propTypes = {
  typeUser: PropTypes.string,
};

export default withLocalize(
  withRouter(connect(null, { toggleLoading })(Register))
);
