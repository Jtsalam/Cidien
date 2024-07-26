<div id="overlay"></div>
    <div id="customAlert" class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Are you still there?</h5>
            <button type="button" class="close" onclick="dismissAlert()">&times;</button>
        </div>
        <div class="modal-body">
            <p>If not, we'll close this session in: <b><span id="countdown"></span></b></p>
        </div>
        <div class="modal-footer">
            <button id="lgin" type="button"  class="btn btn-primary" onclick="stayLoggedIn()">I'm here!</button>
            <button id="lgout"type="button" class="btn btn-danger" onclick="logOff()">Log Out</button>
        </div>
    </div>