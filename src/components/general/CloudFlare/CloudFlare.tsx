import { useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import { RedFormHelperText } from "../mini_components";
import { Translate } from "react-localize-redux";

// interface cloudflareProps {
//   callback: (token: string) => void;
//   error: boolean;
//   callBackBase64: (imgBase64: string) => void;
// }

const CloudFlare = (props) => {
  const turnstileRef = useRef(null);

  useEffect(() => {
    const renderTurnstile = () => {
      window.turnstile.ready(function () {
        window.turnstile.render(turnstileRef.current, {
          sitekey: "1x00000000000000000000AA",
          callback: function (token: string) {
            if (token) {
              props.callback(token);
              console.log(`cloudflare token ${token}`);
            } else {
              console.log(`not found ${token}`);
            }
          },
        });
      });
    };
    if (window.turnstile) {
      renderTurnstile();
    } else {
      window.addEventListener("turnstile-load", renderTurnstile);
    }

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("turnstile-load", renderTurnstile);
    };
  }, []);
  console.log("Props", props);
  return (
    <div>
      <div ref={turnstileRef}></div>
      {/* {props.error === true ? "not allowed" : ""} */}
      {props.error && (
        <Grid container xs={12}>
          <RedFormHelperText>
            <Translate id="general.field-required" />
          </RedFormHelperText>
        </Grid>
      )}
    </div>
  );
};

export default CloudFlare;
