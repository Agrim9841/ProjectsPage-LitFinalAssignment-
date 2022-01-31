import { LitElement, html, css, nothing } from 'lit';


import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-listbox/paper-listbox.js';

/**
 * <add-project-dialog
 *  opened = "The value that opens or close modal."
 *  closeDialog = "Function that closes the modal."
 *  addProject = "Function that adds new project."
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

            .select-container{
                width: 100%;
                position: relative;
            }

            .select-container label{
                position: absolute;
                top: 7px;
                left: 19px;
                font-weight: bold;
                font-size: 13px;
                background-color: white;
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

            .custom-select:focus{
                border: 1px solid #29B6F6;
            }

            .select-container option{
                padding: 10px;
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

            .pipeline-container{
                padding: 10px 20px;
                box-sizing: border-box;
                background-color: rgba(245,245,245);
                border-radius: 8px;
                margin-top: 10px;
            }

            .pipeline{
                display: flex;
                width: 100%;
                margin-bottom: 20px;
                margin-right: 10px;
                box-sizing: border-box;
            }

            .pipeline-col{
                width: 40%;
            }

            .pipeline-input-err{
                background-color: rgba(255,0,0,0.3);
            }

            .del-pipeline-btn{
                color: grey;
            }

            .del-pipeline-btn:hover{
                color: crimson;
            }

            .add-pipeline-btn{
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
             * Function that adds new project.
             * 
             * @type { addProject: Function} 
             */
            addProject: { type: Function },

            /**
             * Array of pipeline object.
             * 
             * @type { pipelineData: Array} 
             */
            pipelineData: { type: Array }
        }
    }

    /**
     * Initialize props and methods.
     */
    constructor(){
        super();

        this.opened = false;
        this.pipelineData = [{ name: "",stage: "" }];
    }

    /**
     * Add new Pipeline row.
     */
    addPipeline(){
        this.pipelineData = [ ...this.pipelineData, { name: "",stage: "" }];
    }

    /**
     * Delete pipeline of given index.
     */
    deletePipeline(pos){
        if(this.pipelineData.length>1){
            let newPipelineData = this.pipelineData.filter((item, index) => index!=pos);
            this.pipelineData = [ ...newPipelineData ];
        }
    }

    /**
     * Handle pipeline name selection event.
     */
    onPipelineSelect(pos, value){
        let newPipelineData = [ ...this.pipelineData ];
        newPipelineData[pos].name = value;
        newPipelineData[pos].stage = "";

        this.pipelineData = [ ...newPipelineData ];
    }

    /**
     * Handle pipeline stage selection event.
     */
    onStageSelect(pos, value){
        let newPipelineData = [ ...this.pipelineData ];
        newPipelineData[pos].stage = value;

        this.pipelineData = [ ...newPipelineData ];
    }

    /**
     * Validate data in pipeline.
     */
    validatePipeline(){
        let pipelineElements = this.shadowRoot.querySelectorAll('.pipeline-input');
        let stageElements = this.shadowRoot.querySelectorAll('.stage-input');
        let validated = true;

        this.pipelineData.map((item, index) => {
            if(item.name == ""){
                pipelineElements[index].classList.add("pipeline-input-err");
                validated = false;
            }else{
                pipelineElements[index].classList.remove("pipeline-input-err");
            }
            
            if(item.stage == ""){
                stageElements[index].classList.add("pipeline-input-err");
                validated = false;
            }else{
                stageElements[index].classList.remove("pipeline-input-err");
            }
        })
        
        return validated;
    }

    /**
     * Clear all input values.
     */
    clearForm(){
        this.shadowRoot.querySelector('#name').value = "";
        this.shadowRoot.querySelector('#description').value = "";
        this.shadowRoot.querySelector('#status-description').value = "";
        this.pipelineData = [{ name: "", stage: "" }];
    }

    /**
     * Handle add project event.
     */
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
        
        if(this.shadowRoot.querySelector('#priority').value){
            newProject.priority = this.shadowRoot.querySelector('#priority').value;
        }else{
            validated = false;
        }

        if(this.shadowRoot.querySelector('#project-status').value){
            newProject.status = this.shadowRoot.querySelector('#project-status').value;
        }else{
            validated = false;
        }

        if(this.shadowRoot.querySelector('#type').value){
            newProject.type = this.shadowRoot.querySelector('#type').value;
        }else{
            validated = false;
        }
        
        if(this.shadowRoot.querySelector('#status-description').value){
            newProject.statusDescription = this.shadowRoot.querySelector('#status-description').value;
        }

        if(this.validatePipeline()){
            newProject.pipeline = this.pipelineData;
        }else{
            validated = false;
        }
        
        if(validated === true){
            this.addProject(newProject);
            this.clearForm();
            this.closeDialog();
        }
    }


    /**
     * Renders Html.
     * 
     * @returns {HTMLElement}
     */
    render(){
        return(html`
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
                        color: black;
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
                    paper-listbox{
                        min-width: 500px;
                    }
                </style>
            </custom-style>
            <paper-dialog id="animated" modal .opened=${this.opened}>
                <h2 class="dialog-heading">Add Project</h2>

                <div class="cross-button" @click=${this.closeDialog}>
                    <paper-button>
                        <iron-icon icon="close" class="cross-icon"></iron-icon>
                    </paper-button>
                </div>

                <paper-dialog-scrollable>

                    <paper-input class="custom" id="name" label="Name *" always-float-label required>
                    </paper-input>

                    <div class="pipeline-container">
                        <h4>Pipelines</h4>
                        ${this.pipelineData.map((item, index)=>{
                            return html`
                                <div class="pipeline">
                                    <div class="pipeline-col">
                                        <div class="select-container">
                                            <label for="project-status">Pipeline *</label>
                                            <select class="custom-select pipeline-input" required
                                             @change=${(e)=>this.onPipelineSelect(index, e.target.value)}>
                                                <option value="" disabled ?selected=${item.name==""}></option>
                                                <option value="ASP Pipeline" ?selected=${item.name==="ASP Pipeline"}>ASP Pipeline</option>
                                                <option value="Antibody Pipeline" ?selected=${item.name==="Antibody Pipeline"}>Antibody Pipeline</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="pipeline-col">
                                        <div class="select-container">
                                            <label for="project-status">Stage *</label>
                                            <select class="custom-select stage-input" required
                                             @change=${(e)=>this.onStageSelect(index, e.target.value)}>
                                                <option value="" disabled ?selected=${item.stage==""}></option>
                                                ${
                                                    item.name==="ASP Pipeline"?
                                                        html`<option value="Lead Identification" ?selected=${item.stage=="Lead Identification"}>Lead Identification</option>`
                                                        : nothing
                                                }
                                                ${
                                                    item.name==="Antibody Pipeline"?
                                                        html`<option value="Lead Validation" ?selected=${item.stage=="Lead Validation"}>Lead Validation</option>`
                                                        : nothing
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <paper-button class="del-pipeline-btn" @click=${()=>this.deletePipeline(index)}>
                                        <iron-icon icon="delete"></iron-icon>
                                    </paper-button>
                                </div>
                            `
                        })}
                        <paper-button class="add-pipeline-btn" @click=${this.addPipeline}>
                            <iron-icon icon="add-circle"></iron-icon>Add Pipeline
                        </paper-button>
                    </div>

                    <paper-textarea class="custom" rows="3" always-float-label
                     id="description" label="Project Description *" required>
                    </paper-textarea>

                    <div class="select-container">
                        <label for="project-status">Priority *</label>
                        <select class="custom-select" id="priority" required>
                            <option value="high" selected>High</option>
                            <option value="medium" selected>Medium</option>
                            <option value="low" selected>Low</option>
                        </select>
                    </div>

                    <div class="select-container">
                        <label for="project-status">Project Type *</label>
                        <select class="custom-select" id="type" required>
                            <option value="external" selected>External Project</option>
                            <option value="internal">Internal Project</option>
                        </select>
                    </div>

                    <div class="select-container">
                        <label for="project-status">Project Status</label>
                        <select class="custom-select" id="project-status" required>
                            <option selected value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="attrited">Attrited</option>
                        </select>
                    </div>

                    <paper-textarea class="custom" rows="3" id="status-description"
                     always-float-label label="Status Description">
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