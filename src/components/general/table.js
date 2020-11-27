import React, { Component } from 'react'
import { withLocalize } from 'react-localize-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ButtonEdit, ButtonDelete } from "./mini_components";
import { Checkbox } from '@material-ui/core';
import { Translate } from 'react-localize-redux';

const CheckboxContainer = styled.div`
    margin:0rem;
    height:40px;
`;

class Table extends Component {
    render() {
        return (
            <div>
                <table key="table-fields" className="table"> 
                    <thead>
                    <tr>
                        {
                            this.props.header.map((label, index) => {
                                const labelString = this.props.translate(label).indexOf("Missing translationId:") !== -1 ?  label : this.props.translate(label);
                                return(<th key={index} scope="col">{ labelString }</th>)
                            })
                        }
                        { this.props.hasOwnProperty("editCallBack") && 
                            <th key="edit" scope="col">
                                <Translate id="general.edit" />
                            </th>
                        }
                        { this.props.hasOwnProperty("deleteCallBack") && 
                            <th key="delete" scope="col">
                            <Translate id="general.delete" />
                        </th>
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.values.map((row, indexRow) => {
                            return(
                                <tr key={`row-${indexRow}`}>
                                    {row.map((value, index) => {
                                        if(typeof value === "boolean"){ 
                                            return (<td key={index}>
                                                        <Checkbox checked={value}  />
                                                    </td>)
                                        }
                                        else if(Array.isArray(value)){ 
                                            return (
                                            <td key={index}>
                                                { value.length } values
                                            </td>)
                                        }
                                        return <td key={index}>{value}</td>
                                    })}
                                    { this.props.hasOwnProperty("editCallBack") && 
                                        <td key={`edit-${indexRow}`}>
                                            <ButtonEdit onClick={() => this.props.editCallBack(indexRow)} />
                                        </td>
                                    }
                                    { this.props.hasOwnProperty("deleteCallBack") && 
                                        <td key={`delete-${indexRow}`}>
                                            <ButtonDelete onClick={() => this.props.deleteCallBack(indexRow)} />
                                        </td>
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

Table.propTypes = {
    header : PropTypes.array,
    values: PropTypes.array
}

export default withLocalize(Table);