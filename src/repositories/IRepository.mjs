class IRepository{
    obtenerId(id){
      throw new Error("Metodo 'obtenidoPorId()' no implementado");     
    }
  
    obtenerTodos(){
      throw new Error("Metodo 'obtenerTodos()' no implementado");
    }   

  }
  
  export default IRepository;