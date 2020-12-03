<?php
if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {

  /*
   * Задача проверить телефон
   */
  //Получаем телефон
  if ( isset($_POST['phone']) && $_POST['phone'] != '' )  {
		$phone = $_POST['phone'];
		//Обрезаем возможные пробелы
		$phone = trim($phone);
		//Удаляем из телефона лишние символы +7 (444) 444-4_-__
		$phone = str_replace( array('-','_',' ', '(', ')' ), '', $phone);
		//Проверяем длину телефона
		if ( strlen($phone) < 11 ) {
			echo json_encode( array('success' => 0, 'text' => 'Длина телефона меньше 11 символов. Пример: 89001112233') );
			exit;
		}
  } else {
    echo json_encode( array('success' => 0, 'text' => 'Не заполнено поле телефон') );
    //exit;
  }


  //Email администратора
  $to = "89676451510@mail.ru";
  $blogname = "stroi-profi.com";
  $message = '';

  //Имя
  if ( isset($_POST['name']) && $_POST['name'] != '' )  {
    $message .= 'Имя: ' . $_POST['name'].PHP_EOL;
  }

  //Телефон
  if ( $phone )  {
		$message .= 'Телефон: ' . $phone.PHP_EOL;
  }

  //Почта
  if ( isset($_POST['email']) && $_POST['email'] != '' )  {
    $message .= 'Почта: ' . $_POST['email'].PHP_EOL;
  }

  //Текстовое поле
  if ( isset($_POST['question']) && $_POST['question'] != '' )  {
    $message .= 'Сообщение: ' . $_POST['question'].PHP_EOL;
  }

  //Формируем тему письма
  $subject = "Новая заявка с сайта - $blogname";

  //Отправляем
  if(
    mail($to, $subject, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: site@stroi-profi.com")
  ) {
    echo json_encode( array('success' => 1, 'text' => 'Сообщение успешно отправлено!') );
    exit;
  } else {
    echo json_encode( array('success' => 0, 'text' => 'Данные формы небыли получены!') );
  }

}//POST
