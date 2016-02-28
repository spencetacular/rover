#pragma strict

public var roverControl : RoverControl;
public var roverMovement : RoverMovement;
public var bottomCamera : GameObject;

var stopDelayTicker : float;
var photographDelayTicker : float;
var stopDelayDuration : float;
var photographDelayDuration : float;
var mode = "";

function Start () {
	roverMovement = GetComponent(RoverMovement);
	roverControl = GetComponent(RoverControl);
	mode = "detecting";
	stopDelayDuration = 0.8;
	photographDelayDuration = 1.0;
	stopDelayTicker = stopDelayDuration;
	photographDelayTicker = photographDelayDuration;

}

function Update () {

	if(roverControl.systemPaused == false){

		if(mode == "stopping") Stop();
		if(mode === "photographing") Photograph();

	}

}

function Stop(){
	stopDelayTicker -= Time.deltaTime;
	if(stopDelayTicker <= 0){
		roverMovement.movementPaused = true;
		mode = "photographing";
	}
}

function Photograph(){
	photographDelayTicker -= Time.deltaTime;
	bottomCamera.GetComponent(Light).intensity = 0.3;

	if(photographDelayTicker <= 0){
		roverMovement.movementPaused = false;
		mode = "detecting";
		stopDelayTicker = stopDelayDuration;
		photographDelayTicker = stopDelayDuration;
		bottomCamera.GetComponent(Light).intensity = 0.0;

	}
}

function OnTriggerEnter (other: Collider)
{
	other.gameObject.GetComponent(BoxCollider).enabled = false;
	
	if(mode == "detecting" && roverMovement.mode == "moveLong"){
		mode = "stopping";
	}

}

