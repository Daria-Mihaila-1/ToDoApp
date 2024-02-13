module.exports = mongoose => {
    var schema = mongoose.Schema({
          title:String,
          description: String,
          done:Boolean
    }, 
    { collection: 'todoappcollection'}
    );
    
    //preparing for the usage of Id in a frontend application
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Task = mongoose.model("Task", schema);
    return Task;
  };