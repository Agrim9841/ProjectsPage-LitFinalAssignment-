import { LitElement, html, css } from 'lit';
import { projects } from '../modules/projects';
import { getLocalObject, setLocalObject } from '../modules/localObject';

import './project-card';
import './confirm-dialog';
import './add-project-dialog';
import './edit-project-dialog';

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';

/**
 * <projects-page></projects-page>
 */
class ProjectsPage extends LitElement {
    /**
     * Styles for the component.
     * 
     * @returns {Array}
     */
    static get styles(){
        return [css`
            header{
                background-color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .container{
                padding: 0px 2%;
                box-sizing: border-box;
            }

            .search-input-field{
                height: 40px;
                width: 180px;
                position: relative;
            }

            .search-icon{
                position: absolute;
                top: 8px;
                left: 8px;
                fill: grey;
                transition-duration: 0.2s;
            }
            
            .search-icon:hover{
                fill: blue;
                cursor: pointer;
            }

            .search-input{
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                padding-left: 35px;
                padding-right: 10px;
                outline: none;
                border: 1px solid grey;
                border-radius: 4px;
                transition-duration: 0.2s;
            }

            .search-input:focus{
                border: 1px solid lightblue;
                box-shadow: 0px 0px 4px blue;
            }

            .projects{
                margin-top: 20px;
                display: flex;
                flex-wrap: wrap;
            }

            .add-project-button{
                background-color: crimson;
                color: white;
                border-radius: 50px;
                height: 50px;
                width: 50px;
                position: fixed;
                right: 25px;
                bottom: 25px;
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
             * Object of all the input names and values.
             * 
             * @type { projects: Array} 
             */
            projects: { type: Array },

            /**
             * The text in the search input field.
             * 
             * @type { searchText: String } 
             */
            searchText: { type: String },

            /**
             * The text after pressing search button.
             * 
             * @type { searchItem: String } 
             */
            searchItem: { type: String },

            /**
             * The project currently being edited.
             * 
             * @type { editedProject: Object } 
             */
            editedProject: { type: Object },

            /**
             * Opens or closes the add project dialogue.
             * 
             * @type { isAddDialogOn: Boolean } 
             */
            isAddDialogOn : { type: Boolean },

            /**
             * Opens or closes the confirm delete dialogue.
             * 
             * @type { isConfirmDialogOn: Boolean } 
             */
            isConfirmDialogOn : { type: Boolean },

            /**
             * Opens or closes the edit delete dialogue.
             * 
             * @type { isEditDialogOn: Boolean } 
             */
            isEditDialogOn : { type: Boolean },
        }
    }

    /**
     * Initialize props and methods.
     */
    constructor(){
        super();

        this.searchText = "";
        this.searchItem = "";
        this.isAddDialogOn = false;
        this.isEditDialogOn = false;
        this.isConfirmDialogOn = false;

        this.projects = getLocalObject("projects");

        if(!this.projects){
            this.projects = projects;
            setLocalObject("projects", this.projects);
        }

        this.editedProject=this.projects[0];
    }

    /**
     * Toggle the value of parameter isAddDialogueOn.
     */
    toggleAddDialog(){
        this.isAddDialogOn = !this.isAddDialogOn;
    }

    /**
     * Toggle the value of parameter isConfirmDialogueOn.
     * 
     * @param {Object} project - The project currently being edited.
     */
    toggleConfirmDialog(project){
        if(project){
            this.editedProject = project;
        }
        this.isConfirmDialogOn = !this.isConfirmDialogOn;
    }

    /**
     * Toggle the value of parameter isConfirmDialogueOn.
     * 
     * @param {Object} project - The project currently being edited.
     */
    toggleEditDialog(project){
        if(project){
            this.editedProject = project;
        }
        this.isEditDialogOn = !this.isEditDialogOn;
    }

    /**
     * Deletes a project.
     * 
     * @param {Number} projectId - The id of the project to be deleted.
     */
    deleteProject(projectId){
        let newProjects = this.projects.filter(project => project.id!==projectId);
        this.projects= [...newProjects];
        setLocalObject("projects", this.projects);
    }

    /**
     * Adds a project.
     * 
     * @param {Object} project - The project to be added.
     */
    addProject(project){
        if(project){
            let generatingId = true;
            let id = 0;
            while(generatingId){
                id = Math.round(Math.random()*1000);
                generatingId = false;
                this.projects.map(project=>{
                    if(project.id === id){
                        generatingId = true;
                    }
                });
            }
            project.id = id;
            this.projects = [ project, ...this.projects ];
            setLocalObject("projects", this.projects);
        }
    }

    /**
     * Handle change in search input field
     * 
     * @param {Object} event - The input or keydown event object
     */
    handleSearchInput(event){
        if(event.type === "input"){
            this.searchText = event.target.value;
        }else if(event.type === "keydown"){
            if(event.key === "Enter"){
                this.handleSearch();
            }
        } 
    }

    /**
     * Handle search event
     */
    handleSearch(){
        this.searchItem = this.searchText;
    }

    /**
     * Renders Html.
     * 
     * @returns {HTMLElement}
     */
    render(){
        return(html`
            <header class="container">
                <h2>Projects</h2>
                <div class="search-input-field">
                    <iron-icon class="search-icon" icon="search" @click=${this.handleSearch}></iron-icon>
                    <input class="search-input" type="text"
                     .value=${this.searchText}
                     @input=${(event)=>this.handleSearchInput(event)}
                     @keydown=${(event)=>this.handleSearchInput(event)}
                     placeholder="Enter project name"/>
                </div>
            </header>
            
            <div class="container projects">
                ${
                    this.projects.map((project)=>{
                        if(this.searchItem){
                            let pos = project.name.toLowerCase().search(this.searchItem.toLowerCase());
                            if(pos>=0){
                                return html`
                                    <project-card .projectDetails=${project}></project-card>
                                `;
                            }
                        }else{
                            return html`
                                <project-card .projectDetails=${project}
                                 .toggleEditDialog=${this.toggleEditDialog.bind(this)}
                                 .toggleConfirmDialog=${this.toggleConfirmDialog.bind(this)}></project-card>
                            `;
                        }
                        
                    })
                }
            </div>

            <paper-icon-button class="add-project-button" icon="add" @click=${this.toggleAddDialog}></paper-icon-button>
            <add-project-dialog .opened=${this.isAddDialogOn} .closeDialog=${this.toggleAddDialog.bind(this)}
             .addProject=${this.addProject.bind(this)}></add-project-dialog>

            <edit-project-dialog .opened=${this.isEditDialogOn} .closeDialog=${this.toggleEditDialog.bind(this)}
             .addProject=${this.addProject.bind(this)} .editedProject=${this.editedProject}></edit-project-dialog>
            
            <confirm-dialog .opened=${this.isConfirmDialogOn} .closeDialog=${this.toggleConfirmDialog.bind(this)}
             .deleteProject=${this.deleteProject.bind(this)} .editedProject=${this.editedProject}></confirm-dialog>
            
        `)
    }
}

customElements.define('projects-page', ProjectsPage);