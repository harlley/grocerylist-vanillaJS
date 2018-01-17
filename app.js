/* 

  [x] Template 
  [x] localStorage
  [x] GroceryList Class

*/
const groceryList = {
  
  items: [],
  
  init: function() {
    this.showList();
    this.attachEvents();
  },
  
  showList: function() {
    const template = document.querySelector("#tplGroceryItem");
    const ul = document.querySelector("ul");

    if (localStorage.getItem("groceries")) {
      ul.innerHTML = "";
      this.items = JSON.parse(localStorage.getItem("groceries"));
      this.items.forEach(function(item) {
        ul.innerHTML += template.innerHTML.replace(/{{name}}/g, item.name);
      });
    }
  },
    
  attachEvents: function() {
    document.querySelector(".save").addEventListener("click", (e) => {
      const itemName = document.querySelector(".itemName input").value;
      this.add({ name: itemName });
      document.querySelector(".itemName input").value = "";
      this.showList();
    });
  },
  
  saveToLocalStorage: function() {
    localStorage.setItem("groceries", JSON.stringify(this.items));
  },
  
  add: function(item) {
    this.items.push(item);
    this.saveToLocalStorage();
  },
  
  remove: function(index) {
    this.items.splice(index, 1);
    this.saveToLocalStorage();
    this.showList();
  }
  
}

//groceryList.init();





const inputItem = {
  
  init: function(el, callback) {
    this.el = el;
    self = this;
    
    el.querySelector(".save").addEventListener("click", function() {
      callback(self.get());
    });

    el.querySelector(".minus").addEventListener("click", function() {
      el.querySelector(".minimumStock .amount").innerHTML = self.minimumStock() - 1;
    });

    el.querySelector(".plus").addEventListener("click", function() {
      el.querySelector(".minimumStock .amount").innerHTML = self.minimumStock() + 1;
    });
    
  },
    
  get: function() {
    return { 
      name: this.name(),
      minimumStock: this.minimumStock()
    };
  },
  
  name: function() {
    return this.el.querySelector("input").value;
  },
  
  minimumStock: function() {
    return parseInt(this.el.querySelector(".minimumStock .amount").innerHTML);
  }  
  
    
}


inputItem.init($("#inputItem"), function(data) {
  console.log("result:", data);
});






function $(element) {
  return document.querySelector(element);
}





