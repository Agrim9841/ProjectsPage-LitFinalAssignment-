import { html } from 'lit';

export let paperInputStyles = html`
    <custom-style>
        <style is="custom-style">
            paper-textarea.custom:hover, paper-dropdown-menu.custom:hover, paper-input.custom:hover {
                border: 1px solid #29B6F6;
            }
            paper-dropdown-menu.custom{
                --paper-input-container-label: {
                    background-color: rgba(245,245,245);
                }
            }
            paper-textarea.custom, paper-dropdown-menu.custom, paper-input.custom {
                margin-top: 9px;
                margin-bottom: 15px;
                --primary-text-color: #01579B;
                --paper-input-container-color: black;
                --paper-input-container-focus-color: black;
                --paper-input-container-invalid-color: red;
                border: 1px solid #BDBDBD;
                border-radius: 5px;
                width: 100%;

                /* Reset some defaults */
                --paper-input-container: { padding: 0;};
                --paper-input-container-underline: { display: none; height: 0;};
                --paper-input-container-underline-focus: { display: none; };

                /* New custom styles */
                --paper-input-container-input: {
                    box-sizing: border-box;
                    font-size: inherit;
                    padding: 1px 20px;
                    color: black;
                };
                --paper-input-container-input-focus: {
                    background: rgba(0, 0, 0, 0);
                };
                --paper-input-container-input-invalid: {
                    background: rgba(255, 0, 0, 0.3);
                };
                --paper-input-container-label: {
                    top: -8px;
                    left: 16px;
                    background: white;
                    padding: 2px;
                    font-weight: bold;
                };
                --paper-input-container-label-floating: {
                    width: auto;
                };
            }
            paper-textarea.custom{
                --paper-input-container: {
                    box-sizing: border-box;
                    font-size: inherit;
                    padding: 1px 20px;
                };
                --paper-input-container-label: {
                    left: 0px;
                    top: -12px;
                    font-weight: bold;
                };
                --paper-input-container-label-floating: {
                    width: auto;
                };
            }
        </style>
    </custom-style>
`;