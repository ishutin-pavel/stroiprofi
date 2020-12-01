<?php

$zip = new ZipArchive;
$zip->open('1.zip');
$zip->extractTo('./');
$zip->close();

?>