import React, { useEffect, useState, useCallback } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";

function Details ({user, handleEditClick, handleDeleteClick })  {
   
    return (
        <tr className="border-0 detail-row bgc-white">
        
        <td colSpan={8} className="p-0 border-none brc-secondary-l2">
                       
                                 <div className="row">
                                     
                            <div className="col-12 col-md-10 offset-md-1 p-4">
                              <div className="alert bgc-secondary-l4 text-dark-m2 border-none border-l-4 brc-primary-m1 radius-0 mb-0">
                                <h4 className="text-primary">
                                  More Details :
                                </h4>
                                <ul className="list-group list-group-flush" >
                                    <li className="list-group-item  bgc-light-l1 " >
                                        <span className=" pr-0 pos-rel text-110 font-weight-bold">
                                         Project Title :</span> {user.project_title}</li>
                                    <li className="list-group-item  bgc-light-l1 " >
                                        <span className=" pr-0 pos-rel text-110 font-weight-bold">
                                         Author : </span><span>Mr/Mme </span>{user.author_lastName}</li>
                                    <li className="list-group-item  bgc-light-l1 " >
                                        <span className=" pr-0 pos-rel text-110 font-weight-bold">
                                         Supervisor:</span> {user.project_title}</li>
                                    <li className="list-group-item  bgc-light-l1 " >
                                        <span className=" pr-0 pos-rel text-110 font-weight-bold">
                                         Level:</span> {user.project_title}</li>     

                                 </ul>

                              </div>
                              
                            </div>
                          </div>
                          </td>                             
                              </tr>
                                    
                          
                        
    );
}
export default Details;
