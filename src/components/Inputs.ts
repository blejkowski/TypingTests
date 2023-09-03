import styled from "styled-components"

export const FormInput = styled.input`
    background-color: rgb(39, 40, 41);
    border-radius: 5px;
    border-width: 0;
    font-size: 1em;
    margin: 1em;
    padding: 0.5em;
`;

export const FormButton = styled.button`
    background-color: rgb(39, 40, 41);
    color: #d1d0c5;
    border-radius:  5px;
    border-width: 0;
    font-size: 1em;
    padding: 0.5em 1.2em 0.5em 1.2em;
    display: flex;
    align-items: center;

    &:hover{
        color: #2c2e31;
        background-color: #d1d0c5;
        cursor: pointer;
    }

`;