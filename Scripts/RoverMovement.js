#pragma strict

public var roverControl : RoverControl;

var movementSpeed : float;                
var turnSpeed : float;
var heading : int;
var bumpsOn : boolean;  
var headingNorth : boolean;        
var movementPaused: boolean;
var moveLongDuration : float;
var moveLongTicker : float;
var moveShortDuration : float;
var moveShortTicker : float;
var courseCorrectionDuration: float;
var courseCorrectionTicker : float;

var mode = "";
private var m_Rigidbody: Rigidbody;

var previousMode = "";

function Awake() {
	m_Rigidbody = GetComponent(Rigidbody);
}

function Start () {

	roverControl = GetComponent(RoverControl);

	movementPaused = false;

	movementSpeed = 1.0;
	turnSpeed = 30.0;
	moveLongDuration = 20.0;
	moveLongTicker = moveLongDuration;
	moveShortDuration = 0.5;
	moveShortTicker =moveShortDuration;
	courseCorrectionDuration = 3.0;
	courseCorrectionTicker = courseCorrectionDuration;

	headingNorth = true;
	mode = "courseCorrection";



}

function Update () {

	heading = parseInt(transform.eulerAngles.y);

	if(movementPaused == false && roverControl.systemPaused == false){
		
		if(mode == "moveLong"){
			MoveForwardLong();
			CourseCorrectionModeTimer();
		}

		if(mode == "moveShort") MoveForwardShort();

		if(mode == "courseCorrection") CourseCorrection();

		if(mode == "firstTurnRight") Turn(90.0, 1.0, "moveShort");

		if(mode == "secondTurnRight") Turn(180.0, 1.0, "moveLong");

		if(mode == "firstTurnLeft") Turn(90.0, -1.0, "moveShort");
		
		if(mode == "secondTurnLeft") Turn(0.0, -1.0, "moveLong");

		if(previousMode != mode){
			Debug.Log("Mode: " + mode);
			previousMode = mode;
		}

		
	}
}

function CourseCorrectionModeTimer(){
	courseCorrectionTicker -= Time.deltaTime;

	if(courseCorrectionTicker <= 0){
			mode = "courseCorrection";
			courseCorrectionTicker = courseCorrectionDuration;
	}
}

private function MoveForwardLong() {

	moveLongTicker -= Time.deltaTime;

	 if (moveLongTicker >= 0 ) {
		var movement: Vector3 = transform.forward * movementSpeed * Time.deltaTime;
		m_Rigidbody.MovePosition(m_Rigidbody.position + movement);

	 } 
	 else{
		if(headingNorth){
			mode = "firstTurnRight";	
		}else mode = "firstTurnLeft";
		
	 }
}

private function MoveForwardShort() {

	 if (moveShortTicker >= 0 ) {
	 	moveShortTicker -= Time.deltaTime;
		var movement: Vector3 = transform.forward * movementSpeed * Time.deltaTime;
		m_Rigidbody.MovePosition(m_Rigidbody.position + movement);

	 } else{
	 	if(headingNorth){
			mode = "secondTurnRight";	
		}else mode = "secondTurnLeft";
	 }
}

function Turn(degrees : float, direction : float, nextMode ){

	if(heading != degrees){
		transform.Rotate(Vector3.up, direction * turnSpeed * Time.deltaTime);
	}
	else{ 
		if(nextMode == "moveLong"){
			resetMoveTicker();
			headingNorth = !headingNorth;
		}
		mode = nextMode;
		
	}
	
}

function resetMoveTicker(){
	moveLongTicker = moveLongDuration;
	moveShortTicker = moveShortDuration;

}

function CourseCorrection( ){

	var direction : float;

	if(headingNorth){

		if(heading >= 180) direction = 1.0;
		else direction = -1.0;

		if(heading != 0 ){
			transform.Rotate(Vector3.up,  direction * turnSpeed * Time.deltaTime);
		}else mode = "moveLong";

	}

	if(headingNorth == false){

		if(heading >= 0 && heading <= 180 ) direction = 1.0;
		else direction = -1.0;

		if(heading != 180){
			transform.Rotate(Vector3.up,  direction * turnSpeed * Time.deltaTime);
		}else mode = "moveLong";
	}


}












