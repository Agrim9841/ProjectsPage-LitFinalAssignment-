import { LitElement, html, css } from 'lit';
import { getLocalObject, setLocalObject } from '../modules/localObject';
import { initialProjects, emptyProjectItem } from '../modules/projects';

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
             * @type { isConfirmDialogOpen: Boolean } 
             */
            isConfirmDialogOpen : { type: Boolean },

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

        this.setProject();
        this.dialogName = "";
        this.searchText = "";
        this.isAddDialogOn = false;
        this.isEditDialogOn = false;
        this.isConfirmDialogOpen = false;
        this.editedProject = { ...emptyProjectItem };

        this.addProject = this.addProject.bind(this);
        this.editProject = this.editProject.bind(this);
        this.setDialogName = this.setDialogName.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.toggleEditDialog = this.toggleEditDialog.bind(this);
        this.setEditedProject = this.setEditedProject.bind(this);
        this.toggleConfirmDialog = this.toggleConfirmDialog.bind(this);
    }

    /**
     * Setup initial value of projects from localstorage.
     */
    setProject(){
        // this.projects = getLocalObject("projects");

        if(!this.projects){
            this.projects = initialProjects;
            setLocalObject("projects", this.projects);
        }
    }

    /**
     * Set value for dialogName.
     * 
     * @param {String} newName - The new value for dialogName.
     */
    setDialogName(newName){
        this.dialogName = newName;
    }

    /**
     * Toggle the value of parameter isAddDialogueOn.
     */
    toggleAddDialog(){
        this.isAddDialogOn = !this.isAddDialogOn;
    }

    /**
     * Set the value of this.editedProject.
     * 
     * @param {Object} newProject - The value to be set.
     */
    setEditedProject(newProject){
        if(newProject){
            this.editedProject = { ...newProject };
        }else{
            this.editedProject = { ...emptyProjectItem }
        }
    }

    /**
     * Toggle the value of parameter isConfirmDialogueOn.
     */
    toggleConfirmDialog(){
        this.isConfirmDialogOpen = !this.isConfirmDialogOpen;
    }

    /**
     * Toggle the value of parameter isConfirmDialogueOn.
     */
    toggleEditDialog(){
        this.isEditDialogOn = !this.isEditDialogOn;
    }

    /**
     * Adds a project.
     * 
     * @param {Object} project - The project to be added.
     */
    addProject(newProject){
        if(!newProject){
            return;
        }

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
        newProject.id = id;
        this.projects = [ newProject, ...this.projects ];
        this.editedProject = { ...emptyProjectItem };
        setLocalObject("projects", this.projects);
    }

    /**
     * Edit an project.
     * 
     * @param {Object} newProject - The id of the project to be deleted.
     */
    editProject(newProject){
        if(!newProject){
            return;
        }

        let newProjects = this.projects.map(project => {
            if(project.id === newProject.id){
                return { ...newProject };
            }else{
                return project;
            }
        });
        this.projects = [ ...newProjects ];
        setLocalObject("projects", this.projects);
    }

    /**
     * Delete a project.
     * 
     * @param {Number} projectId - The id of the project to be deleted.
     */
    deleteProject(projectId){
        let newProjects = this.projects.filter(project => project.id!==projectId);
        this.projects= [...newProjects];
        setLocalObject("projects", this.projects);
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
                    <iron-icon class="search-icon" icon="search"></iron-icon>
                    <input class="search-input" type="text"
                     .value=${this.searchText}
                     @input=${( event ) => this.searchText = event.target.value}
                     placeholder="Enter project name"/>
                </div>
            </header>
            
            <div class="container projects">
                ${
                    this.projects.map((project)=>{
                        if(this.searchText){
                            let pos = project.name.toLowerCase().search(this.searchText.toLowerCase());
                            if(pos>=0){
                                return html`
                                    <project-card .projectDetails=${project}></project-card>
                                `;
                            }
                        }else{
                            return html`
                                <project-card .projectDetails=${project}
                                 .setDialogName = ${this.setDialogName}
                                 .setEditedProject = ${this.setEditedProject}
                                 .toggleEditDialog = ${this.toggleEditDialog}
                                 .toggleConfirmDialog = ${this.toggleConfirmDialog}>
                                </project-card>
                            `;
                        }
                        
                    })
                }
            </div>

            <paper-icon-button class="add-project-button" icon="add" @click=${()=>{
                this.setEditedProject();
                this.setDialogName("Add");
                this.toggleEditDialog();
            }}></paper-icon-button>

            <edit-project-dialog
             .opened = ${this.isEditDialogOn}
             .dialogName = ${this.dialogName}
             .addProject = ${this.addProject}
             .editProject = ${this.editProject}
             .editedProject = ${this.editedProject}
             .closeDialog = ${this.toggleEditDialog}>
            </edit-project-dialog>
            
            <confirm-dialog
             .opened = ${this.isConfirmDialogOpen}
             .editedProject = ${this.editedProject}
             .deleteProject = ${this.deleteProject}
             .closeDialog = ${this.toggleConfirmDialog}>
            </confirm-dialog>
            
        `)
    }
}

customElements.define('projects-page', ProjectsPage);