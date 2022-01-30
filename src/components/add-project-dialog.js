import { LitElement, html, css } from 'lit';


import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/neon-animation/animations/fade-in-animation.js';

/**
 * <add-project-dialog
 *  opened = "The value that opens or close modal."
 *  closeDialog = "Function that closes the modal."
 * ></add-project-dialog>
 */
class AddProjectDialog extends LitElement {
    /**
     * Styles for the component.
     * 
     * @returns {Array}
     */
    static get styles(){
        return [css`
            paper-dialog {
                width: 700px;
                border-radius: 5px;
                overflow: auto;
            }

            paper-dialog::-webkit-scrollbar {
                display: none;
            }

            .toggle-dialogue-btn{
                background-color: teal;
                color: white;
                margin-top: 20px;
                margin-left: 20px;
            }

            .cross-button{
                position: absolute;
                right: 0px;
                top: -10px;
                padding: 5px;
            }

            .cross-icon{
                transition-duration: 0.2s;
            }

            .cross-icon:hover{
                color: red;
            }

            .dialog-heading{
                margin: 25px 0px;
            }

            .custom-select{
                width: 100%;
                border-radius: 5px;
                margin-top: 16px;
                border: 1px solid #BDBDBD;
                padding-top: 16px;
                padding-bottom: 6px;
                padding-left: 17px;
                outline: none;
            }

            .buttons{
                padding: 25px 20px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
            }

            .add-btn{
                background-color: crimson;
                color: white;
                margin-right: 30px;
            }
        `];
    }

    /**
     * Properties for the component.
     * 
     * @returns {Object} 
     */
    static get properties(){
        return {
            /**
             * The value that opens or close modal.
             * 
             * @type { opened: Boolean} 
             */
            opened: { type: Boolean },
            
            /**
             * Function that closes the modal.
             * 
             * @type { closeDialog: Function} 
             */
            closeDialog: { type: Function }
        }
    }

    /**
     * Initialize props and methods.
     */
    constructor(){
        super();

        this.opened = false;
    }

    handleAddButtonClick(){
        let validated = true;
        let newProject = {};

        if(this.shadowRoot.querySelector('#name').validate()){
            newProject.name = this.shadowRoot.querySelector('#name').value;
        }else{
            validated = false;
        }
        
        if(this.shadowRoot.querySelector('#description').validate()){
            newProject.description = this.shadowRoot.querySelector('#description').value;
        }else{
            validated = false;
        }
        
        if(this.shadowRoot.querySelector('#priority').validate()){
            newProject.priority = this.shadowRoot.querySelector('#priority').value;
        }else{
            validated = false;
        }
        
        // validated = this.shadowRoot.querySelector('#name').validate();
        // validated = validated? this.shadowRoot.querySelector('#description').validate(): validated;
        // validated = validated? this.shadowRoot.querySelector('#priority').validate(): validated;
        if(validated === true){
            console.log(newProject);
        }
    }


    /**
     * Renders Html.
     * 
     * @returns {HTMLElement}
     */
    render(){
        return(html`
            <paper-dialog id="animated" modal .opened=${this.opened}>
                <h2 class="dialog-heading">Add Project</h2>

                <div class="cross-button" @click=${this.closeDialog}>
                    <paper-button>
                        <iron-icon icon="close" class="cross-icon"></iron-icon>
                    </paper-button>
                </div>

                <paper-dialog-scrollable>
                    <custom-style>
                        <style is="custom-style">
                            paper-textarea.custom:hover, paper-dropdown-menu.custom:hover, paper-input.custom:hover {
                                border: 1px solid #29B6F6;
                            }
                            paper-textarea.custom, paper-dropdown-menu.custom, paper-input.custom {
                                margin-top: 14px;
                                --primary-text-color: #01579B;
                                --paper-input-container-color: black;
                                --paper-input-container-focus-color: black;
                                --paper-input-container-invalid-color: black;
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
                            paper-listbox{
                                min-width: 500px;
                            }
                        </style>
                    </custom-style>

                    <paper-input class="custom" id="name" label="Name *" always-float-label required>
                    </paper-input>

                    <paper-textarea class="custom" rows="3" always-float-label
                     id="description" label="Project Description *" required>
                    </paper-textarea>

                    <paper-dropdown-menu class="custom" label="Priority *" noink no-animations
                     id="priority" horizontal-align="left" required>
                        <paper-listbox slot="dropdown-content" class="dropdown-content" selected="0">
                            <paper-item>High</paper-item>
                            <paper-item>Medium</paper-item>
                            <paper-item>Low</paper-item>
                        </paper-listbox>
                    </paper-dropdown-menu>

                    <paper-dropdown-menu class="custom" label="Project Type *"
                     horizontal-align="left" noink no-animations required>
                        <paper-listbox slot="dropdown-content" selected="0">
                            <paper-item>Internal Project</paper-item>
                            <paper-item>External Project</paper-item>
                        </paper-listbox>
                    </paper-dropdown-menu>

                    <select class="custom-select" id="project-status" required>
                        <option selected value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    <paper-textarea class="custom" rows="3" always-float-label label="Status Description">
                    </paper-textarea>

                </paper-dialog-scrollable>

                <div class="buttons">
                    <paper-button autofocus raised class="add-btn"
                     @click=${this.handleAddButtonClick}>Add</paper-button>
                    <paper-button dialog-dismiss>Cancel</paper-button>
                </div>
            </paper-dialog>
        `)
    }
}

customElements.define('add-project-dialog', AddProjectDialog);