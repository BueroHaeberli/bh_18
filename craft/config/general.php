<?php

return array(
	'*' => array(
	    'generateTransformsBeforePageLoad' => true,
	    'enableCsrfProtection' => false,
	    'omitScriptNameInUrls' => true,
	    'limitAutoSlugsToAscii' => true,
	    'convertFilenamesToAscii' => true,
	    'allowAutoUpdates' => false,
	),

	'buerohaeberli.local' => array(
	    'devMode' => true,
	    // 'cacheDuration' => 'PT1S',
	    'allowAutoUpdates' => true,

	    'environmentVariables' => array(
			'basePath' => $_SERVER['DOCUMENT_ROOT'].'/user_assets/',
			'baseUrl'  => 'http://buerohaeberli.local:8080/',
	    ),

	    // 'siteUrl' => array(
	    //   'de' => 'http://localhost:3000/',
	    //   'en' => 'http://localhost:3000/en/',
	    // ),
	),

	'client.ch' => array(
		'cacheDuration' => '0',
    	'devMode' => false,

	    'environmentVariables' => array(
	     	'basePath' => $_SERVER['DOCUMENT_ROOT'].'/user_assets/',
	    ),

    	// 'siteUrl' => array(
     	//		'de' => 'https://www.tribecraft.ch/',
     	//		'en' => 'https://www.tribecraft.ch/en/',
    	// )
  	)
);
