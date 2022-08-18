const { Bannerbear } = require('bannerbear');
const bb = new Bannerbear(process.env.BB_API_KEY);
const TEMPLATE_ID = 'k4qoBVDy1gLEDzN0gj';

exports.generateWallpaper = async function(todoTasks) {

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

