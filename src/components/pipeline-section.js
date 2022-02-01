import { LitElement, html, css, nothing } from 'lit';
import { paperInputStyles } from '../customStyles/paperStyles';

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';


const pipelineNameList = [
    "ASP Pipeline", "Antibody Pipeline"
]

const pipelineStageList = [
    { name: "Lead Identification", requirements: ['ASP Pipeline']}, 
    { name: "Lead Validation", requirements: ['Antibody Pipeline']},
]
/**
 * <pipeline-section
 *  opened = "The value that opens or close modal."
 *  closeDialog = "Function that closes the modal."
 *  editedProject = "The project currently being edited.""
 *  deleteProject = "Function to delete a project.
 * ></pipeline-section>
 */
class Pipeline extends LitElement {
    /**
     * Styles for the component.
     * 
     * @returns {Array}
     */
    static get styles(){
        return [css`
            .pipeline-container{
                padding: 10px 20px;
                box-sizing: border-box;
                background-color: rgba(245,245,245);
                border-radius: 8px;
                margin-top: 9px;
                margin-bottom: 15px;
            }

            .pipeline{
                display: flex;
                width: 100%;
                margin-bottom: 20px;
                margin-right: 10px;
                box-sizing: border-box;
            }

            .pipeline-col{
                flex: 43%;
                padding-right: 20px;
                box-sizing: border-box;
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
                color: blue;
            }
            
            .add-pipeline-btn iron-icon{
                margin-right: 10px;
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
            addPipeline: { type: Function },
            
            onStageSelect: { type: Function },
            
            deletePipeline: { type: Function },
            
            onPipelineSelect: { type: Function },

            editedProject: { type: Object },
        }
    }

    /**
     * Initialize props and methods.
     */
    constructor(){
        super();

        this.editedProject = {};
    }

    /**
     * Renders Html.
     * 
     * @returns {HTMLElement}
     */
    render(){
        return(html`
            ${paperInputStyles}
            <div class="pipeline-container">
                <h4>Pipeline(s)</h4>

                ${this.editedProject.pipeline?
                this.editedProject.pipeline.map((pipelineItem, index)=>{
                    return html`
                        <div class="pipeline">
                            <div class="pipeline-col">
                                    
                                <paper-dropdown-menu class="custom" label="Pipeline *" always-float-label id="pipeline" 
                                 horizontal-align="left" vertical-offset="50" no-animations allowOutsideScroll required
                                 error-message="Please select a pipeline!">
                                    <paper-listbox slot="dropdown-content" ?selected=${pipelineItem.name? "0": nothing}>
                                        ${pipelineNameList.map((item) => {
                                            if(item === pipelineItem.name){
                                                return html`
                                                    <paper-item @click=${() => this.onPipelineSelect(index, item)}
                                                    >${item}</paper-item>
                                                `
                                            }
                                        })}
                                        ${pipelineNameList.map((item) => {
                                            if(item !== pipelineItem.name){
                                                return html`
                                                    <paper-item @click=${() => this.onPipelineSelect(index, item)}
                                                    >${item}</paper-item>
                                                `
                                            }
                                        })}
                                    </paper-listbox>
                                </paper-dropdown-menu>

                            </div>
                            <div class="pipeline-col">
                                
                                <paper-dropdown-menu class="custom" label="Stage *" always-float-label id="stage" 
                                 horizontal-align="left" vertical-offset="50" no-animations allowOutsideScroll required
                                 error-message="Please select a stage!">
                                    <paper-listbox slot="dropdown-content" ?selected=${pipelineItem.stage? "0": nothing}>
                                        ${pipelineStageList.map((item) => {
                                            if(item === pipelineItem.stage){
                                                return html`
                                                    <paper-item @click=${() => this.onStageSelect(index, item.name)}
                                                    >${item.name}</paper-item>
                                                `
                                            }
                                        })}
                                        ${pipelineStageList.map((item) => {
                                            if(item !== pipelineItem.stage){
                                                let required = false;
                                                item.requirements.map((requirement)=>{
                                                    if(requirement === pipelineItem.name){
                                                        required = true;
                                                    }
                                                });

                                                if(!required){
                                                    return nothing;
                                                }

                                                return html`
                                                    <paper-item @click=${() => this.onStageSelect(index, item.name)}
                                                    >${item.name}</paper-item>
                                                `
                                            }
                                        })}
                                    </paper-listbox>
                                </paper-dropdown-menu>

                            </div>
                            <paper-button class="del-pipeline-btn" @click=${()=>this.deletePipeline(index)}>
                                <iron-icon icon="delete"></iron-icon>
                            </paper-button>
                        </div>
                    `
                }): nothing }
                <paper-button class="add-pipeline-btn" @click=${this.addPipeline}>
                    <iron-icon icon="add-circle" @click=${this.addPipeline}></iron-icon>Add Pipeline
                </paper-button>
            </div>
        `)
    }
}

customElements.define('pipeline-section', Pipeline);