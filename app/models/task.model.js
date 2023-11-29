module.exports = mongoose => {
    var schema = mongoose.Schema({
          
          description: String,
          done:Boolean
    }, 
    { collection: 'todoappcollection'}
    );
    
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Task = mongoose.model("Task", schema);
    return Task;
  };