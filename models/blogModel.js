var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({

	title       :  {type:String,default:"",required:true},
	subTitle    :  {type:String,default:""},
	blogBody    :  {type:String,default:""},
	tags        :  [],  //name of tags in an array
	created     :  {type:Date},
	lastModified:  {type:Date},
	authorInfo  :  {}   //Information of author in form of object


});


mongoose.model('Blog',blogSchema);