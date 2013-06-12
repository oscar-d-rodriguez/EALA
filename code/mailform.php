
<?php 
$dontsendemail = 0;
$possiblespam = FALSE;
$strlenmessage = "";
$name = $_POST['name'];
$company = $_POST['company'];
$email = $_POST['email']; 
$message = $_POST['message']; 
$mailTo = $_POST['mailTo']; 
$subject = "From ealagdn website";

function checkemail($field) {
	// checks proper syntax
	if( !preg_match( "/^([a-zA-Z0-9])+([a-zA-Z0-9._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9._-]+)+$/", $field))
	{
		die("Improper email address detected. Please hit your browser back button and try again."); 
		return 1;
	}
}
function spamcheck($field) {
	if(eregi("to:",$field) || eregi("cc:",$field) || eregi("\r",$field) || eregi("\n",$field) || eregi("%0A",$field)){ 
		$possiblespam = TRUE;
	}else $possiblespam = FALSE;
	if ($possiblespam) {
		die("Possible spam attempt detected. If this is not the case, please edit the content of the contact form and try again.");
		return 1;
	}
}



	
if ($dontsendemail == 0) $dontsendemail = checkemail($email);
if ($dontsendemail == 0) $dontsendemail = spamcheck($email);


 $url = 'http://sendgrid.com/';
 $user = 'azure_96f8dbe9a10bfdae8e2d9207273790ee@azure.com';
 $pass = 'jy4uelbz'; 

 $params = array(
      'api_user' => $user,
      'api_key' => $pass,
      'to' => $mailTo,
      'subject' => 'Message from '.$name.' , Company: '.$company.' through EALA GDN Website',
      'html' => $message,
      'text' => $message,
      'from' => $email,
   );

 $request = $url.'api/mail.send.json';

 
if ($dontsendemail == 0) {
    // Generate curl request
     $session = curl_init($request);

     // Tell curl to use HTTP POST
     curl_setopt ($session, CURLOPT_POST, true);

     // Tell curl that this is the body of the POST
     curl_setopt ($session, CURLOPT_POSTFIELDS, $params);

     // Tell curl not to return headers, but do return the response
     curl_setopt($session, CURLOPT_HEADER, false);
     curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

     // obtain response
     $response = curl_exec($session);
     curl_close($session);

     // print everything out
     print_r($response);

}
?>