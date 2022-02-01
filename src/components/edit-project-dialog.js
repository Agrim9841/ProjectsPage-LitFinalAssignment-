import { LitElement, html, css } from 'lit';
import { paperInputStyles } from '../customStyles/paperStyles';
import './pipeline-section';

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';

const dropdownItemsPriority = [
    {name: "Low", value: "low"},
    {name: "Medium", value: "medium"},
    {name: "High", value: "high"}
]

const dropdownItemsType = [
    {name: "External Project", value: "external"},
    {name: "Internal Project", value: "internal"}
]

/**
 * 
 */
const dropdownItemsStatus = [
    {name: "In Progress", value: "in progress"},
    {name: "Completed", value: "completed"},
    {name: "Attrited", value: "attrited"}
]

/**
 * <edit-project-dialog
 *  opened = "The value that opens or close modal."
 *  closeDialog = "Function that closes the modal."
 *  addProject = "Function that adds new project."
 * ></edit-project-dialog>
 */
class EditProjectDialog extends LitElement {
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
            closeDialog: { type: Function },
            
            /**
             * Function that adds new project.
             * 
             * @type { addProject: Function} 
             */
            addProject: { type: Function },

            /**
             * Function that edit a project.
             * 
             * @type { editProject: Function} 
             */
            editProject: { type: Function },

            /**
             * Array of pipeline object.
             * 
             * @type { pipelineData: Array} 
             */
            pipelineData: { type: Array },
            
            /**
             * The name of the dialog.
             * 
             * @type { dialogName: String } 
             */
            dialogName: { type: String },

            /**
             * The project currently being edited.
             * 
             * @type { editedProject: Object } 
             */
            editedProject: { type: Object }
        }
    }

    /**
     * Initialize props and methods.
     */
    constructor(){
        super();

        this.opened = false;
        this.dialogName = "";
        this.editedProject = {};

        this.addPipeline = this.addPipeline.bind(this);
        this.onStageSelect = this.onStageSelect.bind(this);
        this.deletePipeline = this.deletePipeline.bind(this);
        this.onPipelineSelect = this.onPipelineSelect.bind(this);
    }

    /**
     * Add new Pipeline row.
     */
    addPipeline(){
        this.editedProject = {
            ...this.editedProject,
            pipeline: [ ...this.editedProject.pipeline, { name: "",stage: "" }]
        };
    }

    /**
     * Delete pipeline of given index.
     */
    deletePipeline(pos){
        if(this.editedProject.pipeline.length<=1){
            return;
        }
            
        let newPipelineData = this.editedProject.pipeline.filter((item, index) => index!=pos);
        this.editedProject = {
            ...this.editedProject,
            pipeline: newPipelineData,
        };
    }

    /**
     * Handle pipeline name selection event.
     */
    onPipelineSelect(pos, value){
        let newPipelineData = [ ...this.editedProject.pipeline ];
        newPipelineData[pos].name = value;
        newPipelineData[pos].stage = "";

        this.editedProject = {
            ...this.editedProject,
            pipeline: newPipelineData,
        };
    }

    /**
     * Handle pipeline stage selection event.
     */
    onStageSelect(pos, value){
        let newPipelineData = [ ...this.editedProject.pipeline ];
        newPipelineData[pos].stage = value;

        this.editedProject = {
            ...this.editedProject,
            pipeline: newPipelineData,
        };
    }

    /**
     * Handle add project event.
     */
    handleButtonClick(){
        if(!this.validate()){
            return
        }

        this.closeDialog();
        if(this.dialogName === "Edit"){
            this.editProject({...this.editedProject});
        }else if(this.dialogName === "Add"){
            this.addProject({ ...this.editedProject });
        }
        this.clearInputs();
    }

    /**
     * Renders Html.
     * 
     * @returns {HTMLElement}
     */
    render(){
        return(html`
            ${paperInputStyles}
            <paper-dialog id="animated" modal .opened=${this.opened}>
                <h2 class="dialog-heading">${this.dialogName} Project</h2>

                <div class="cross-button" @click=${this.closeDialog}>
                    <paper-button>
                        <iron-icon icon="close" class="cross-icon"></iron-icon>
                    </paper-button>
                </div>

                <paper-dialog-scrollable>

                    <paper-input class="custom" id="name" label="Name *" always-float-label required
                     .value=${this.editedProject.name} @input=${ (e) => this.editedProject.name = e.target.value }
                     error-message="This is a required field!">
                    </paper-input>

                    <pipeline-section
                     .addPipeline=${this.addPipeline}
                     .onStageSelect=${this.onStageSelect}
                     .deletePipeline=${this.deletePipeline}
                     .onPipelineSelect=${this.onPipelineSelect}
                     .editedProject=${this.editedProject}>
                    </pipeline-section>

                    <paper-textarea class="custom" rows="3" always-float-label required
                     id="description" label="Project Description *" .value=${this.editedProject.description}
                     @input=${(e) => this.editedProject.description = e.target.value} required
                     error-message="This is a required field!">
                    </paper-textarea>

                    <paper-dropdown-menu class="custom" label="Priority *" always-float-label id="priority" 
                     horizontal-align="left" vertical-offset="50" no-animations allowOutsideScroll required
                     error-message="Please select priority!">
                        <paper-listbox slot="dropdown-content" selected="0">
                            ${dropdownItemsPriority.map((item) => {
                                if(this.editedProject.priority === item.value){
                                    return html`
                                        <paper-item @click=${() => this.editedProject.priority = item.value}
                                         >${item.name}</paper-item>
                                    `
                                }
                            })}
                            ${dropdownItemsPriority.map((item) => {
                                if(this.editedProject.priority !== item.value){
                                    return html`
                                        <paper-item @click=${() => this.editedProject.priority = item.value}
                                         >${item.name}</paper-item>
                                    `
                                }
                            })}
                        </paper-listbox>
                    </paper-dropdown-menu>

                    <paper-dropdown-menu class="custom" label="Project Type *" always-float-label id="type" 
                     horizontal-align="left" vertical-offset="50" no-animations allowOutsideScroll required
                     error-message="Please select a project type!">
                        <paper-listbox slot="dropdown-content" selected="0">
                            ${dropdownItemsType.map((item) => {
                                if(this.editedProject.type === item.value){
                                    return html`
                                        <paper-item @click=${() => this.editedProject.type = item.value}
                                         >${item.name}</paper-item>
                                    `
                                }
                            })}
                            ${dropdownItemsType.map((item) => {
                                if(this.editedProject.type !== item.value){
                                    return html`
                                        <paper-item @click=${() => this.editedProject.type = item.value}
                                         >${item.name}</paper-item>
                                    `
                                }
                            })}
                        </paper-listbox>
                    </paper-dropdown-menu>

                    <paper-dropdown-menu class="custom" label="Project Status *" always-float-label id="status" 
                     horizontal-align="left" vertical-offset="50" no-animations allowOutsideScroll required
                     error-message="Please select a project status!">
                        <paper-listbox slot="dropdown-content" selected="0">
                            ${dropdownItemsStatus.map((item) => {
                                if(this.editedProject.status === item.value){
                                    return html`
                                        <paper-item @click=${() => this.editedProject.status = item.value}
                                         >${item.name}</paper-item>
                                    `
                                }
                            })}
                            ${dropdownItemsStatus.map((item) => {
                                if(this.editedProject.status !== item.value){
                                    return html`
                                        <paper-item @click=${() => this.editedProject.status = item.value}
                                         >${item.name}</paper-item>
                                    `
                                }
                            })}
                        </paper-listbox>
                    </paper-dropdown-menu>

                    <paper-textarea class="custom" rows="3" id="status-description"
                     always-float-label label="Status Description" .value=${this.editedProject.statusDescription}
                     @input=${(e)=>this.editedProject.statusDescription=e.target.value}>
                    </paper-textarea>

                </paper-dialog-scrollable>

                <div class="buttons">
                    <paper-button autofocus raised class="add-btn"
                     @click=${this.handleButtonClick}>${this.dialogName}</paper-button>
                    <paper-button dialog-dismiss>Cancel</paper-button>
                </div>
            </paper-dialog>
        `)
    }

    validate(){
        let validated = true;
        
        this.shadowRoot.querySelector("#name").validate();
        if(!this.editedProject.name){
            validated = false;
        }

        this.shadowRoot.querySelector("#description").validate();
        if(!this.editedProject.description){
            validated = false;
        }

        this.shadowRoot.querySelector("#type").validate();
        if(!this.editedProject.type){
            validated = false;
        }

        this.shadowRoot.querySelector("#priority").validate();
        if(!this.editedProject.priority){
            validated = false;
        }

        this.shadowRoot.querySelector("#status").validate();
        if(!this.editedProject.status){
            validated = false;
        }

        let pipelineElements = this.shadowRoot.querySelector("pipeline-section").shadowRoot.querySelectorAll("#pipeline");
        let stageElements = this.shadowRoot.querySelector("pipeline-section").shadowRoot.querySelectorAll("#stage");
        this.editedProject.pipeline.map((item, index)=>{
            pipelineElements[index].validate();
            if(!item.name){
                validated = false;
            }
            stageElements[index].validate();
            if(!item.stage){
                validated = false;
            }
        })

        return validated;
    }

    clearInputs(){
        this.shadowRoot.querySelector("#name").value = "";
        this.shadowRoot.querySelector("#description").value = "";
        this.shadowRoot.querySelector("#status-description").value = "";
        let pipelineElements = this.shadowRoot.querySelector("pipeline-section").shadowRoot.querySelectorAll("#pipeline");
        let stageElements = this.shadowRoot.querySelector("pipeline-section").shadowRoot.querySelectorAll("#stage");
        pipelineElements.forEach(pipelineElement=>{
            pipelineElement.value = "";
        })
        stageElements.forEach(stageElement=>{
            stageElement.value = "";
        })
    }
}

customElements.define('edit-project-dialog', EditProjectDialog);