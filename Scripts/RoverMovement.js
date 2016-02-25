#pragma strict

var movementSpeed : float;                
var turnSpeed : float;

var heading : float;

var bumpsOn : boolean;  

var headingNorth : boolean;        

var moveLongDuration : float;
var moveLongTicker : float;
var moveShortDuration : float;
var moveShortTicker : float;

var turnedRight :boolean;
var paused = false;
var mode = "";
private var m_Rigidbody: Rigidbody;

function Awake() {
	m_Rigidbody = GetComponent(Rigidbody);
}

function Start () {

	movementSpeed = 1.0;
	turnSpeed = 30.0;
	moveLongDuration = 20.0;
	moveLongTicker = moveLongDuration;
	moveShortDuration = 0.5;
	moveShortTicker =moveShortDuration;

	heading = transform.eulerAngles.y;
	turnedRight = false;

	headingNorth = true;
	mode = "courseCorrection";

	bumpsOn = true;

}

function Update () {
 heading = transform.eulerAngles.y;
//	if(transform.eulerAngles.y < 360.0){
//		heading = transform.eulerAngles.y;
//	}else{heading = transform.eulerAngles.y -360.0;}

	if(paused == false){
		if(mode == "courseCorrection"){
			CourseCorrection();
		}
		if(mode == "moveLong"){
			MoveForwardLong();
		}
		if(mode == "firstTurnRight"){
			TurnRightFirst();
		}
		if(mode == "moveShort"){
			MoveForwardShort();
		}
		if(mode == "secondTurnRight"){
			TurnRightSecond();
		}
		if(mode == "firstTurnLeft"){
			TurnLeftFirst();
		}
		if(mode == "secondTurnLeft"){
			TurnLeftSecond();
		}

//		Debug.Log("Ticker "+ moveLongTicker);
//		Debug.Log("Short Ticker "+ moveShortTicker);
//		Debug.Log(mode);
	}
}



private function MoveForwardLong() {

	moveLongTicker -= Time.deltaTime;

	 if (moveLongTicker >= 0 ) {
		var movement: Vector3 = transform.forward * movementSpeed * Time.deltaTime;
		m_Rigidbody.MovePosition(m_Rigidbody.position + movement);

	 } 
	 else{
		if(turnedRight == false){
			mode = "firstTurnRight";	
		}else{
			mode = "firstTurnLeft";
		}
	 }
}

private function MoveForwardShort() {

	 if (moveShortTicker >= 0 ) {
	 	moveShortTicker -= Time.deltaTime;
		var movement: Vector3 = transform.forward * movementSpeed * Time.deltaTime;
		m_Rigidbody.MovePosition(m_Rigidbody.position + movement);

	 } else{
	 	if(turnedRight == false){
			mode = "secondTurnRight";	
		}else{
			mode = "secondTurnLeft";
		}
	 }
}

private function TurnRightFirst() {

	if(transform.eulerAngles.y < 90.0){
		transform.Rotate(Vector3.up,  turnSpeed * Time.deltaTime);

	}else{
		mode = "moveShort";
	}
}

private function TurnRightSecond() {

	if(transform.eulerAngles.y < 180.0){
		transform.Rotate(Vector3.up,  turnSpeed * Time.deltaTime);

	}else{
		mode = "moveLong";
		moveLongTicker = moveLongDuration;
		moveShortTicker = moveShortDuration;
		turnedRight = true;
	}
}

private function TurnLeftFirst() {

	if(transform.eulerAngles.y > 90.0){
		transform.Rotate(Vector3.up,  -turnSpeed * Time.deltaTime);
	}else mode = "moveShort";
	
}

private function TurnLeftSecond() {

	if(transform.eulerAngles.y > 1.0  ){
		transform.Rotate(Vector3.up,  -turnSpeed * Time.deltaTime);

	}else{
		mode = "moveLong";
		moveLongTicker = moveLongDuration;
		moveShortTicker = moveShortDuration;
		turnedRight = false;
	}
}



function CourseCorrection( ){

	var direction : float;

	if(headingNorth){

		if(heading >= 180) direction = 1.0;
		else direction = -1.0;

		if(heading < 359.0 && heading >1.0  ){
			transform.Rotate(Vector3.up,  direction * turnSpeed * Time.deltaTime);
		}else mode = "moveLong";

	}

	if(headingNorth == false){

		if(heading >= 0 && heading <= 180 ) direction = 1.0;
		else direction = -1.0;

		if(heading < 179.0 || heading > 181.0){
			transform.Rotate(Vector3.up,  direction * turnSpeed * Time.deltaTime);
		}else mode = "moveLong";
	}


}

function Bump(degrees : float){
	if(mode == "moveLong" && bumpsOn == true){
		transform.Rotate(Vector3.up, degrees);
		Debug.Log("Bump!");
		Debug.Log(transform.eulerAngles.y);
	}

}











