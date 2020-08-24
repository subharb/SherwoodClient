import React, { Component } from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CheckboxContainer = styled.div`
    margin:0rem;
    height:40px;
`;

class Table extends Component {
    render() {
        return (
            <div>
                <table key="table-fields" className="striped"> 
                    <thead>
                    <tr>
                        {
                            this.props.header.map(label => {
                                const labelString = this.props.translate(label).indexOf("Missing translationId:") !== -1 ?  label : this.props.translate(label);
                                return(<th >{ labelString }</th>)
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.values.map((row, index) => {
                            return(
                                <tr key={index}>
                                    {row.map((value, index) => {
                                        if(typeof value === "boolean"){ 
                                            const checked = value ? <input type="checkbox" className="filled-in" checked="checked" disabled="disabled" /> : <input type="checkbox" getByText="filled-in" disabled="disabled" />
                                            return (<td key={index}>
                                                        <CheckboxContainer className="input-field">
                                                        <label>
                                                            {checked}
                                                            <span></span>
                                                        </label>
                                                        </CheckboxContainer>
                                                    </td>)
                                        }
                                        return <td>{value}</td>
                                    })}
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