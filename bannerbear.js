const { Bannerbear } = require('bannerbear');
const bb = new Bannerbear(process.env.BB_API_KEY);
const TEMPLATE_ID = 'k4qoBVDy1g7rDzN0gj'; //replace this with your own template ID

exports.generateWallpaper = async function(todoTasks, calendarObj) {

  var modifications =  [
    {
      "name": "todo_title_work",
      "text": "Work",
    },
    {
      "name": "todo_title_personal",
      "text": "Personal",
    },
    {
      "name": "todo_title_others",
      "text": "Others",
    },
    {
      "name": "month_title",
      "text": calendarObj.month,
    },
    {
      "name": "month_dates_text",
      "text": calendarObj.dates,
    }
  ];

  for (category in todoTasks) {

    var bb_object = {
      "name": "",
      "text": "",
    };

    const todo = todoTasks[category];
    var todoText = '';

    for(i in todo) {
      todoText += `- ${todo[i]}\n`
    }

    switch(category){
      case 'Personal':
        bb_object.name = 'todo_item_personal';
        break;
      case 'Work':
        bb_object.name = 'todo_item_work';
        break;
      default:
        bb_object.name = 'todo_item_others'

    }

    bb_object.text = todoText;

    modifications.push(bb_object);
  }

  const images = await bb.create_image(TEMPLATE_ID, {"modifications": modifications}, true);

  return images.image_url_png;
}

