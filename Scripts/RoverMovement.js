#pragma strict

var movementSpeed = 1.0;                
var turnSpeed = 30.0;          

var moveLongDuration : float;
var moveLongTicker : float;
var moveShortDuration : float;
var moveShortTicker : float;

var turnedRight :boolean;
var paused = false;
var mode = "moveLong";
private var m_Rigidbody: Rigidbody;

function Awake() {
	m_Rigidbody = GetComponent(Rigidbody);
}

function Start () {
	moveLongDuration = 5.0;
	moveLongTicker = moveLongDuration;
	moveShortDuration = 0.5;
	moveShortTicker =moveShortDuration;
	turnedRight = false;

}

function Update () {

	if(paused == false){
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
	}else{
		mode = "moveShort";
	}
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











