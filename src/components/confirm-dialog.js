import { LitElement, html, css } from 'lit';

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';

/**
 * <confirm-dialog
 *  opened = "The value that opens or close modal."
 *  closeDialog = "Function that closes the modal."
 *  editedProject = "The project currently being edited.""
 *  deleteProject = "Function to delete a project.
 * ></confirm-dialog>
 */
class ConfirmDialog extends LitElement {
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

            .buttons{
                padding: 25px 20px;
            }

            .delete-btn{
                margin-left: 30px;
                color: crimson;
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
            closeDialog: { type: Function },

            /**
             * The project currently being edited.
             * 
             * @type { editedProject: Object } 
             */
            editedProject: { type: Object },

            /**
             * Function to delete a project.
             * 
             * @type { deleteProject: Function } 
             */
            deleteProject: { type: Function },
        }
    }

    /**
     * Initialize props and methods.
     */
    constructor(){
        super();

        this.opened = false;
        this.editedProject = {};
    }

    /**
     * Delete project and close dialog
     */
    confirmDeleteEvent(){
        this.deleteProject(this.editedProject.id);
        this.closeDialog();
    }

    /**
     * Renders Html.
     * 
     * @returns {HTMLElement}
     */
    render(){
        return(html`
            <paper-dialog id="animated" modal .opened=${this.opened}>
                <h2 class="dialog-heading">Confirm Delete</h2>

                <div class="cross-button" @click=${this.closeDialog}>
                    <paper-button>
                        <iron-icon icon="close" class="cross-icon"></iron-icon>
                    </paper-button>
                </div>

                <div>
                    Are you sure you want to delete project "${this.editedProject.name}"?
                </div>

                <div class="buttons">
                    <paper-button dialog-dismiss>Cancel</paper-button>
                    <paper-button autofocus class="delete-btn"
                     @click=${this.confirmDeleteEvent}>Delete</paper-button>
                </div>
            </paper-dialog>
        `)
    }
}

customElements.define('confirm-dialog', ConfirmDialog);