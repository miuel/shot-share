import yo from 'yo-yo';
import layout from '../layout';
// import translate from '../translate';
var translate = require('../translate').message;
import header from '../header';

export default  function userPageTemplate(user) {

		var el = yo`
    <div class="row user-page">
        <div class="col s12 m10 offset-m1 l8 offset-l2 center-align heading">
            <div class="row">
                <div class="col s12 m10 offset-m1 l3 offset-l3 center">
                  <img src="${user.avatar}"  class="responsive-img circle"  />
                </div>
                <div class="col s12 m10 offset-m1 l6 left-align">
                  <h4 class="hide-on-large-only center-align">${user.name}</h4>
                  <h4 class="hide-on-med-and-down left-align">${user.name}</h4>
                </div>
            </div>
            <div class="row">
                ${user.pictures.map(function (picture) {
                        return yo`<div class="col s12 m6 l4">
                                      <a href="/${user.username}/${picture.id}" class="picture-container">
                                          <img src="${picture.src}" class="picture" />
                                          <div class="likes"><i class="fa fa-heart"></i> ${picture.likes || 0}</div>
                                      </a>

                                       <div id="modal${picture.id}" class="modal modal-fixed-footer">
                                             <div class="modal-content center">
                                               <img src="${picture.src}" />
                                             </div>
                                         <div class="modal-footer">
                                              <div class="chip">
                                                        <img src="${user.avatar}" alt="Contact Person" />
                                                            ${user.name}
                                              </div>  
                                                    <div class=" likes"><i class="fa fa-heart"></i> ${translate('likes', { likes: picture.likes || 0})} </div>                
                                                     
                                         </div>
                                      </div>
                                  </div>`;
                      })}
            </div>              
        </div>
    </div>`
		return layout(el);
}



