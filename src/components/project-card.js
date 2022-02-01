import { LitElement, html, css } from 'lit';

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-menu-button/paper-menu-button.js';

/**
 * <project-card
 *  setDialogName = "Function to set dialog name."
 *  setEditedProject = "Function to set Edited Project."
 *  projectDetails = "Object of individual project detail."
 *  toggleEditDialog = "Function to toggle edit project dialog."
 *  toggleConfirmDialog = "Function to toggle confirm delete project dialog."
 * ></project-card>
 */
class ProjectCard extends LitElement {
    /**
     * Styles for the component.
     * 
     * @returns {Array}
     */
    static get styles(){
        return [css`
            hr{
                color: rgb(200,200,200);
            }

            ::-webkit-scrollbar {
                width: 6px;
                border-radius: 20px;
            }

            /* Track */
            ::-webkit-scrollbar-track {
                background: #f1f1f1; 
            }
            
            /* Handle */
            ::-webkit-scrollbar-thumb {
                background: #bbb;
                border-radius: 10px;
            }

            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
                background: #aaa; 
            }

            @media only screen and (max-width: 680px) {
                :host{
                    width: 100%;
                }
            }

            @media only screen and (min-width: 680px) {
                :host{
                    width: 50%;
                }
            }

            @media only screen and (min-width: 1100px) {
                :host{
                    width: 33.33%;
                }
            }

            @media only screen and (min-width: 1500px) {
                :host{
                    width: 25%;
                }
            }

            :host{
                box-sizing: border-box;
                padding: 10px;
            }

            .card{
                background-color: white;
                box-sizing: border-box;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0px 1px 3px grey;
            }

            .card-heading{
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                position: relative;
            }

            .card-heading h2{
                flex-grow: 1;
            }

            .card-image-container{
                width: 50px;
                height: 50px;
                background-color: pink;
                border-radius: 5px;
                margin-right: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                font-size: 2rem;
                color: white;
            }

            .card-description{
                width: 100%;
                height: 70px;
                overflow: auto;
                margin-bottom: 20px;
                font-size: 0.95rem;
                padding-right: 20px;
                box-sizing: border-box;
            }

            .card-details{
                display: flex;
                width: 100%;
                margin-bottom: 20px;
            }

            .card-pipeline{
                display: flex;
                width: 100%;
                height: 90px;
                overflow: auto;
            }

            .card-details-column, .card-pipeline-column{
                width: 50%;
            }
            
            .card-details-column h4, .card-pipeline-column h4{
                color: grey;
                margin: 0px;
                margin-bottom: 10px;
                font-weight: 500;
            }

            .card-details-column p, .card-pipeline-column p{
                margin: 0px;
                text-transform: capitalize;
                font-size: 0.95rem;
            }

            .card-pipeline-column p{
                color: rgba(0,0,255,0.6);
                margin-bottom: 4px;
            }

            .menu-icon{
                color: grey;
            }

            .menu-item{
                padding: 0px 20px;
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
             * Object of individual project detail.
             * 
             * @type { projectDetails: Object} 
             */
            projectDetails: { type: Object },

            /**
             * Function to set dialog name.
             * 
             * @type { setDialogName: Function} 
             */
            setDialogName: { type: Function },

            /**
             * Function to set Edited Project.
             * 
             * @type { setEditedProject: Function} 
             */
            setEditedProject: { type: Function },

            /**
             * Function to toggle Edit project dialog.
             * 
             * @type { toggleEditDialog: Function} 
             */
            toggleEditDialog: { type: Function },

            /**
             * Function to toggle confirm delete project dialog.
             * 
             * @type { toggleConfirmDialog: Function } 
             */
            toggleConfirmDialog: { type: Function },
        }
    }

    /**
     * Initialize props and methods.
     */
    constructor(){
        super();

    }

    /**
     * Toggle the value of isMenuOpen.
     */
    closeMenu(){
        let menuButton = this.shadowRoot.querySelector(".menu-button");
        menuButton.close();
    }

    /**
     * Handle Edit Click Event.
     */
    handleEditEvent(){
        this.closeMenu();
        this.setDialogName("Edit");
        this.setEditedProject(this.projectDetails);
        this.toggleEditDialog();
    }

    /**
     * Handle Confirm Delete Click Event.
     */
    handleConfirmEvent(){
        this.closeMenu();
        this.setDialogName("Delete");
        this.setEditedProject(this.projectDetails);
        this.toggleConfirmDialog();
    }

    /**
     * Renders Html.
     * 
     * @returns {HTMLElement}
     */
    render(){
        return(html`
            <div class="card">
                <div class="card-heading">
                    <div class="card-image-container">
                        ${this.projectDetails.name[0]}
                    </div>
                    <h2>${this.projectDetails.name}</h2>
                    <paper-menu-button class="menu-button" no-animations>
                        <paper-icon-button icon="more-vert" slot="dropdown-trigger"></paper-icon-button>
                        <paper-listbox slot="dropdown-content">
                            <paper-item class="menu-item" @click=${this.closeMenu}>
                                <paper-icon-item>
                                    <iron-icon class="menu-icon" icon="info" slot="item-icon"></iron-icon>
                                    View Details
                                </paper-icon-item>
                            </paper-item>
                            <paper-item class="menu-item" @click=${this.handleEditEvent}>
                                <paper-icon-item>
                                    <iron-icon class="menu-icon" icon="create" slot="item-icon"></iron-icon>
                                    Edit
                                </paper-icon-item>
                            </paper-item>
                            <paper-item class="menu-item" @click=${this.handleConfirmEvent}>
                                <paper-icon-item>
                                    <iron-icon class="menu-icon" icon="delete" slot="item-icon"></iron-icon>
                                    Delete
                                </paper-icon-item>
                            </paper-item>
                        </paper-listbox>
                    </paper-menu-button>
                </div>
                
                <div class="card-description">
                    ${this.projectDetails.description}
                </div>
                
                <hr/>

                <div class="card-details">
                    <div class="card-details-column">
                        <h4>Priority</h4>
                        <p>${this.projectDetails.priority}</p>
                    </div>
                    <div class="card-details-column">
                        <h4>Status</h4>
                        <p>${this.projectDetails.status}</p>
                    </div>
                </div>

                <hr/>

                <div class="card-pipeline">
                    <div class="card-pipeline-column">
                        <h4>Pipeline</h4>
                        ${
                            this.projectDetails.pipeline.map((pipeline)=>html`
                                <p>${pipeline.name}</p>
                            `)
                        }
                    </div>
                    <div class="card-pipeline-column">
                        <h4>Stage</h4>
                        ${
                            this.projectDetails.pipeline.map((pipeline)=>html`
                                <p>${pipeline.stage}</p>
                            `)
                        }
                    </div>
                </div>
            </div> 
        `)
    }
}

customElements.define('project-card', ProjectCard);