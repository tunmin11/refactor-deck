export interface ContentPair {
  en: string;
  mm: string;
}

export interface CodeSnippet {
  initial: string;
  solution: string;
}

export interface QuestionItem {
  question: string;
  answer: ContentPair;
  tags: string[];
  codeSnippet?: CodeSnippet;
}

export const STATIC_QUESTIONS: QuestionItem[] = [
  { 
    question: "In Object-Oriented Programming, what is the relationship between a class and an object?", 
    answer: {
      en: "A class acts as a blueprint that defines structure, while an object is a concrete instance of that class.",
      mm: "$Class$ ဆိုတာက blueprint ပုံစံခွက်တစ်ခုဖြစ်ပြီး၊ $Object$ ကတော့ အဲဒီပုံစံခွက်ကနေ ထွက်လာတဲ့ လက်တွေ့အကောင်အထည်ပါပဲ။"
    },
    tags: ['oop', 'class', 'object'],
    codeSnippet: {
      initial: `// No Class Definition
const car1 = { make: "Toyota", speed: 0 };
const car2 = { make: "Honda", speed: 0 };
// Hard to enforce structure or methods`,
      solution: `class Car {
  constructor(public make: string) {}
  drive() { console.log("Vroom"); }
}

// Instances (Objects)
const myCar = new Car("Toyota");`
    }
  },
  { 
    question: "What characterizes a 'superclass' in a class hierarchy?", 
    answer: {
      en: "It is a parent class that lists common attributes and behaviors shared by its child subclasses.",
      mm: "သူကတော့ မိဘ Class ပေါ့၊ သားသမီး ($child subclasses$) တွေအားလုံး သုံးလို့ရမယ့် common attributes တွေနဲ့ behaviors တွေကို စုစည်းထားတဲ့နေရာပါ။"
    },
    tags: ['oop', 'inheritance'] 
  },
  { 
    question: "How do subclasses typically interact with methods inherited from a parent class?", 
    answer: {
      en: "Subclasses can override inherited methods to either replace or enhance the default behavior.",
      mm: "အမွေရထားတဲ့ method တွေကို override လုပ်ပြီး အသစ်ပြန်ရေးတာဖြစ်ဖြစ်၊ ရှိပြီးသား behavior ကို ထပ်ဖြည့်တာမျိုးဖြစ်ဖြစ် လုပ်လေ့ရှိကြတယ်။"
    },
    tags: ['oop', 'inheritance', 'polymorphism'] 
  },
  { 
    question: "What is the primary goal of the software design principle 'Encapsulate what varies'?", 
    answer: {
      en: "To isolate the parts of a program that change frequently, protecting the rest of the code from adverse effects.",
      mm: "ခဏခဏ ပြောင်းလဲတတ်တဲ့ အပိုင်းတွေကို သီးသန့်ခွဲထုတ်ထားလိုက်တာပါ။ ဒါမှ ကျန်တဲ့ code တွေကို ထိခိုက်မှုမရှိအောင် ကာကွယ်ပေးနိုင်မှာလေ။"
    },
    tags: ['design principles', 'clean code'] 
  },
  { 
    question: "Why is 'Favor Composition Over Inheritance' considered a beneficial design principle?", 
    answer: {
      en: "It reduces tight coupling and increases flexibility by assembling objects rather than relying on rigid class hierarchies.",
      mm: "သူက $Class$ တွေကို အသေချိတ်ဆက်တာမျိုးမဟုတ်ဘဲ၊ $Object$ တွေကို တွဲစပ်သုံးတာမို့ tight coupling ဖြစ်တာ လျော့နည်းစေပြီး flexibility ပိုရှိစေလို့ပါ။"
    },
    tags: ['design principles', 'composition'],
    codeSnippet: {
      initial: `class Bird { fly() {} }
// Penguin inherits fly() but can't fly!
class Penguin extends Bird {}`,
      solution: `class Penguin {
  // Composition: Has-a relationship
  constructor(private swimmer: Swimmer) {}
  
  move() { this.swimmer.swim(); }
}`
    }
  },
  { 
    question: "Define the Single Responsibility Principle (SRP) within the context of SOLID.", 
    answer: {
      en: "A class should have only one reason to change, meaning it should perform only one job or responsibility.",
      mm: "$Class$ တစ်ခုမှာ ပြောင်းလဲဖို့ အကြောင်းရင်း တစ်ခုပဲ ရှိရမယ်။ ဆိုလိုတာက သူလုပ်ရမယ့် အလုပ် ($responsibility$) တစ်ခုပဲ ရှိရမယ်လို့ ပြောတာပါ။"
    },
    tags: ['solid', 'srp'],
    codeSnippet: {
      initial: `class User {
  authenticate() { /* ... */ }
  saveToDb() { /* ... */ }
  sendEmail() { /* ... */ } 
  // 3 reasons to change!
}`,
      solution: `class User { /* data only */ }
class AuthService { authenticate() { ... } }
class Repo { save() { ... } }
class Emailer { send() { ... } }`
    }
  },
  { 
    question: "What does the Open/Closed Principle (OCP) suggest regarding software entities?", 
    answer: {
      en: "Classes should be open for extension but closed for modification.",
      mm: "$Class$ တွေက extension လုပ်ဖို့အတွက် $open$ ဖြစ်ရမယ်၊ ဒါပေမယ့် ပြင်ဆင်ဖို့ ($modification$) အတွက်တော့ $close$ ဖြစ်ရမယ်တဲ့။"
    },
    tags: ['solid', 'ocp'],
    codeSnippet: {
      initial: `function getArea(shape: any) {
  if (shape.type === 'circle') return ...;
  if (shape.type === 'square') return ...;
  // Must modify this function for every new shape
}`,
      solution: `interface Shape { area(): number; }

function getArea(shapes: Shape[]) {
  // Works for any new Shape without changing this code
  return shapes.reduce((sum, s) => sum + s.area(), 0);
}`
    }
  },
  { 
    question: "Which design principle requires that subclasses must be substitutable for their base classes without breaking the application?", 
    answer: {
      en: "Liskov Substitution Principle (LSP).",
      mm: "$Liskov Substitution Principle (LSP)$ ပါ။"
    },
    tags: ['solid', 'lsp'] 
  },
  { 
    question: "What is the primary objective of the Interface Segregation Principle (ISP)?", 
    answer: {
      en: "To ensure that clients are not forced to depend on methods they do not use by splitting large interfaces into smaller, specific ones.",
      mm: "မလိုတဲ့ method တွေကို အတင်းသုံးခိုင်းတာမျိုး မဖြစ်စေဖို့၊ $Interface$ အကြီးကြီးတွေကို သေးပြီး တိကျတဲ့ အပိုင်းလေးတွေအဖြစ် ခွဲထုတ်ဖို့ပါ။"
    },
    tags: ['solid', 'isp'],
    codeSnippet: {
      initial: `interface Worker {
  work(): void;
  eat(): void;
}
// Robot shouldn't be forced to eat!
class Robot implements Worker { ... }`,
      solution: `interface Workable { work(): void; }
interface Feedable { eat(): void; }

class Robot implements Workable { ... }
class Human implements Workable, Feedable { ... }`
    }
  },
  { 
    question: "According to the Dependency Inversion Principle (DIP), what should high-level modules depend upon?", 
    answer: {
      en: "They should depend on abstractions rather than concrete implementations.",
      mm: "$Concrete implementations$ တွေကို မမှီခိုဘဲ $Abstractions$ တွေကိုပဲ မှီခိုသင့်တယ်လို့ ဆိုလိုတာပါ။"
    },
    tags: ['solid', 'dip'] 
  },
  { 
    question: "What are Angular 'Signals' designed to be in terms of reactivity?", 
    answer: {
      en: "Synchronous, fine-grained reactive values that notify dependents when their value changes.",
      mm: "$Synchronous$ ဖြစ်ပြီး fine-grained reactive values တွေပါ။ တန်ဖိုးပြောင်းသွားရင် သူ့ကိုမှီခိုနေတဲ့ကောင်တွေကို အသိပေးတယ်။"
    },
    tags: ['angular', 'signals'],
    codeSnippet: {
      initial: `// Traditional variable - no reactivity
let count = 0;
count = 5; 
// UI doesn't know it changed automatically`,
      solution: `// Signal
const count = signal(0);
count.set(5); 

// Effect runs automatically when count changes
effect(() => console.log(count()));`
    }
  },
  { 
    question: "In Angular, what function is used to create a reactive value that derives its state from other signals?", 
    answer: {
      en: "The computed() function.",
      mm: "$computed()$ function ကို သုံးပါတယ်။"
    },
    tags: ['angular', 'signals'],
    codeSnippet: {
      initial: `// Manual update
updateTotal() {
  this.total = this.price * this.qty;
  // Must remember to call this everywhere
}`,
      solution: `// Declarative derivation
price = signal(10);
qty = signal(2);

// Always up to date
total = computed(() => price() * qty());`
    }
  },
  { 
    question: "Under what condition should a developer choose Signals over RxJS Observables in Angular?", 
    answer: {
      en: "When managing local UI state or simple synchronous derived values.",
      mm: "Local UI state တွေကို manage လုပ်တဲ့အခါ၊ ဒါမှမဟုတ် ရိုးရှင်းတဲ့ synchronous derived values တွေအတွက်ဆို $Signals$ က ပိုကောင်းပါတယ်။"
    },
    tags: ['angular', 'signals'] 
  },
  { 
    question: "What scenario specifically requires the use of RxJS Observables rather than Angular Signals?", 
    answer: {
      en: "Working with asynchronous data streams like HTTP requests or WebSocket events.",
      mm: "HTTP requests တွေ၊ WebSocket events တွေလိုမျိုး asynchronous data streams တွေနဲ့ လုပ်ရတဲ့အခါမျိုးပေါ့။"
    },
    tags: ['angular', 'rxjs'] 
  },
  { 
    question: "Which Angular utility function converts an Observable into a Signal?", 
    answer: {
      en: "The toSignal() function.",
      mm: "$toSignal()$ function ပါ။"
    },
    tags: ['angular', 'rxjs', 'signals'] 
  },
  { 
    question: "Which Angular utility function converts a Signal into an Observable?", 
    answer: {
      en: "The toObservable() function.",
      mm: "$toObservable()$ function ပါ။"
    },
    tags: ['angular', 'rxjs', 'signals'] 
  },
  { 
    question: "Define Dependency Injection (DI) as a design pattern.", 
    answer: {
      en: "A pattern where components receive their dependencies from an external source rather than creating them internally.",
      mm: "$Components$ တွေက သူတို့လိုတဲ့ dependencies တွေကို ကိုယ်တိုင်မဆောက်ဘဲ အပြင်ကနေ လှမ်းထည့်ပေးတာကို လက်ခံယူတဲ့ pattern ပါ။"
    },
    tags: ['di', 'architecture', 'angular'] 
  },
  { 
    question: "What is the role of an IoC (Inversion of Control) Container?", 
    answer: {
      en: "It manages the instantiation and lifecycle of objects, inverting the control of object creation from components to the library.",
      mm: "$Objects$ တွေရဲ့ lifecycle နဲ့ instantiation ကို သူက တာဝန်ယူပေးတယ်။ Object ဆောက်တဲ့ control ကို component တွေဆီကနေ library ဆီ လွှဲပြောင်းယူလိုက်တာပေါ့။"
    },
    tags: ['di', 'architecture'] 
  },
  { 
    question: "In TypeScript, what must be enabled in tsconfig.json for decorators to emit type metadata for DI?", 
    answer: {
      en: "The emitDecoratorMetadata option.",
      mm: "$emitDecoratorMetadata$ option ကို ဖွင့်ပေးရပါမယ်။"
    },
    tags: ['typescript', 'di'] 
  },
  { 
    question: "What specific metadata key does the reflect-metadata polyfill use to store constructor parameter types?", 
    answer: {
      en: "design:paramtypes",
      mm: "$design:paramtypes$ ပါ။"
    },
    tags: ['typescript', 'reflection'] 
  },
  { 
    question: "What is the purpose of the @Injectable() decorator in a custom DI system?", 
    answer: {
      en: "To mark a class as a service that can be managed and instantiated by the DI container.",
      mm: "$Class$ တစ်ခုကို service အဖြစ် သတ်မှတ်ဖို့ပါ။ ဒါမှ DI container က သူ့ကို manage လုပ်ပြီး instantiate လုပ်ပေးနိုင်မှာလေ။"
    },
    tags: ['di', 'angular'] 
  },
  { 
    question: "What are the four fundamental categories of design patterns?", 
    answer: {
      en: "Creational, Structural, Behavioral, and Concurrency patterns.",
      mm: "$Creational$, $Structural$, $Behavioral$ နဲ့ $Concurrency$ patterns တွေဖြစ်ပါတယ်။"
    },
    tags: ['design patterns'] 
  },
  { 
    question: "What is the core focus of Creational design patterns?", 
    answer: {
      en: "Providing flexible mechanisms for the efficient and controlled creation of objects.",
      mm: "$Objects$ တွေကို ထိထိရောက်ရောက်နဲ့ control လုပ်ပြီး create လုပ်နိုင်မယ့် flexible mechanisms တွေ ပေးဖို့ပါ။"
    },
    tags: ['design patterns', 'creational'] 
  },
  { 
    question: "Intent: Singleton Pattern", 
    answer: {
      en: "To ensure a class has only one instance while providing a global access point to that instance.",
      mm: "$Class$ တစ်ခုမှာ instance တစ်ခုတည်းရှိဖို့ အာမခံပြီး၊ အဲဒီ instance ကို နေရာတိုင်းကနေ ယူသုံးလို့ရအောင် လုပ်ဖို့ပါ။"
    },
    tags: ['design patterns', 'creational', 'singleton'],
    codeSnippet: {
      initial: `class Database {
  constructor() { console.log("New DB"); }
}
// Client creates multiple instances
const db1 = new Database();
const db2 = new Database();`,
      solution: `class Database {
  private static instance: Database;
  private constructor() {} // Block direct new()

  static getInstance() {
    if (!this.instance) this.instance = new Database();
    return this.instance;
  }
}`
    }
  },
  { 
    question: "Intent: Factory Method Pattern", 
    answer: {
      en: "To provide an interface for creating objects in a superclass while allowing subclasses to alter the type of objects created.",
      mm: "$Objects$ ဆောက်ဖို့ interface ကို superclass မှာ ပေးထားမယ်၊ ဒါပေမယ့် subclass တွေက ဘယ် object type ကို ဆောက်မလဲဆိုတာ ပြောင်းခွင့်ပေးထားတာပါ။"
    },
    tags: ['design patterns', 'creational', 'factory'],
    codeSnippet: {
      initial: `class Logistics {
  deliver(mode: string) {
    if (mode === 'truck') return new Truck();
    if (mode === 'ship') return new Ship();
    // Violation of OCP
  }
}`,
      solution: `abstract class Logistics {
  abstract createTransport(): Transport;
  plan() {
    const t = this.createTransport();
    t.deliver();
  }
}
// Subclasses decide the specific Transport`
    }
  },
  { 
    question: "Intent: Abstract Factory Pattern", 
    answer: {
      en: "To produce families of related objects without specifying their concrete classes.",
      mm: "$Concrete classes$ တွေကို အတိအကျမပြောဘဲ ဆက်စပ်နေတဲ့ objects အုပ်စုတွေကို ထုတ်လုပ်ပေးဖို့ပါ။"
    },
    tags: ['design patterns', 'creational', 'factory'] 
  },
  { 
    question: "Intent: Builder Pattern", 
    answer: {
      en: "To separate the construction of a complex object from its representation, allowing the same process to create different versions.",
      mm: "$Complex object$ တစ်ခု ဆောက်လုပ်တဲ့ process ကို သူ့ရဲ့ representation နဲ့ ခွဲထုတ်လိုက်တာပါ။ ဒါမှ process တစ်ခုတည်းနဲ့ ပုံစံအမျိုးမျိုး ထွက်လာနိုင်မှာလေ။"
    },
    tags: ['design patterns', 'creational', 'builder'] 
  },
  { 
    question: "Intent: Prototype Pattern", 
    answer: {
      en: "To create new objects by copying an existing instance rather than instantiating from scratch.",
      mm: "အသစ်ကနေ စဆောက်မယ့်အစား ရှိပြီးသား instance ကို copy ကူးပြီး object အသစ်ပွားတာပါ။"
    },
    tags: ['design patterns', 'creational', 'prototype'] 
  },
  { 
    question: "What do Structural design patterns primarily deal with?", 
    answer: {
      en: "The organization and composition of classes and objects to form larger, flexible structures.",
      mm: "$Classes$ နဲ့ $Objects$ တွေကို ဖွဲ့စည်းပြီး ပိုကြီးမား flexible ဖြစ်တဲ့ structures တွေ ဖြစ်လာအောင် စီစဉ်တာနဲ့ ဆိုင်ပါတယ်။"
    },
    tags: ['design patterns', 'structural'] 
  },
  { 
    question: "Intent: Adapter Pattern", 
    answer: {
      en: "To allow objects with incompatible interfaces to collaborate by converting one interface into another.",
      mm: "$Interface$ မတူလို့ တွဲသုံးလို့မရတဲ့ objects တွေကို interface တစ်ခုကနေ တစ်ခုပြောင်းပြီး တွဲသုံးလို့ရအောင် လုပ်ပေးတာပါ။"
    },
    tags: ['design patterns', 'structural', 'adapter'],
    codeSnippet: {
      initial: `// Old system expects XML
function parseXML(xml: string) {}

// New library provides JSON
const jsonData = { ... };
// parseXML(jsonData); // Error: Incompatible type`,
      solution: `class JsonToXmlAdapter {
  constructor(private jsonLib: JsonLibrary) {}
  
  getXML() {
    // Converts JSON to XML internally
    return this.convertToXml(this.jsonLib.getData());
  }
}`
    }
  },
  { 
    question: "Intent: Bridge Pattern", 
    answer: {
      en: "To decouple an abstraction from its implementation so the two can vary independently.",
      mm: "$Abstraction$ နဲ့ $Implementation$ ကို ခွဲထုတ်လိုက်တာပါ။ ဒါမှ နှစ်ဖက်စလုံး လွတ်လွတ်လပ်လပ် ပြောင်းလဲနိုင်မှာလေ။"
    },
    tags: ['design patterns', 'structural', 'bridge'] 
  },
  { 
    question: "Intent: Composite Pattern", 
    answer: {
      en: "To compose objects into tree structures to represent part-whole hierarchies, allowing uniform treatment of individual and composed objects.",
      mm: "$Objects$ တွေကို tree structures ဖွဲ့ပြီး part-whole hierarchies အဖြစ် ပြတာပါ။ Individual object နဲ့ composed object တွေကို တန်းတူဆက်ဆံလို့ရစေတယ်။"
    },
    tags: ['design patterns', 'structural', 'composite'] 
  },
  { 
    question: "Intent: Decorator Pattern", 
    answer: {
      en: "To dynamically add new behaviors to objects by placing them inside special wrapper objects.",
      mm: "$Objects$ တွေကို special wrapper objects တွေထဲ ထည့်ပြီး behavior အသစ်တွေကို dynamic ဖြစ်ဖြစ် ထပ်ပေါင်းထည့်တာပါ။"
    },
    tags: ['design patterns', 'structural', 'decorator'],
    codeSnippet: {
      initial: `class Notifier {
  send(msg) { ... }
}
// Inheriting for every combo explodes classes
class SMSNotifier extends Notifier {}
class SMSAndSlackNotifier extends Notifier {}`,
      solution: `// Wrappers
const stack = new SlackDecorator(
  new SMSDecorator(
    new Notifier()
  )
);
stack.send("Alert!"); // Chains behavior`
    }
  },
  { 
    question: "Intent: Facade Pattern", 
    answer: {
      en: "To provide a simplified interface to a complex library, framework, or subsystem.",
      mm: "ရှုပ်ထွေးတဲ့ library, framework သို့မဟုတ် subsystem ကြီးတစ်ခုလုံးအတွက် ရိုးရှင်းတဲ့ interface တစ်ခု ဖန်တီးပေးတာပါ။"
    },
    tags: ['design patterns', 'structural', 'facade'],
    codeSnippet: {
      initial: `// Client needs to know inner workings
const a = new AudioSystem();
const v = new VideoSystem();
a.init(); v.load(); v.play();`,
      solution: `class MediaPlayerFacade {
  playMovie() {
    this.audio.init();
    this.video.load();
    this.video.play();
  }
}
// Client just calls one method
facade.playMovie();`
    }
  },
  { 
    question: "Intent: Flyweight Pattern", 
    answer: {
      en: "To reduce RAM usage by sharing common parts of state between multiple similar objects.",
      mm: "တူညီတဲ့ $objects$ အများကြီးကြားမှာ common parts တွေကို မျှသုံးပြီး RAM usage လျှော့ချတာပါ။"
    },
    tags: ['design patterns', 'structural', 'flyweight'] 
  },
  { 
    question: "Intent: Proxy Pattern", 
    answer: {
      en: "To provide a substitute or placeholder for another object to control access to it.",
      mm: "$Object$ တစ်ခုကို တိုက်ရိုက်မသုံးဘဲ ကြားခံအနေနဲ့ အစားထိုးသုံးပြီး access ကို control လုပ်တာပါ။"
    },
    tags: ['design patterns', 'structural', 'proxy'] 
  },
  { 
    question: "What is the primary concern of Behavioral design patterns?", 
    answer: {
      en: "The communication between objects and the delegation of responsibilities.",
      mm: "$Objects$ တွေကြား ဆက်သွယ်မှု (communication) နဲ့ တာဝန်ခွဲဝေမှု (delegation) ပါ။"
    },
    tags: ['design patterns', 'behavioral'] 
  },
  { 
    question: "Intent: Observer Pattern", 
    answer: {
      en: "To define a subscription mechanism that notifies multiple objects automatically about events happening to the object they observe.",
      mm: "$Object$ တစ်ခုမှာ တစ်ခုခုဖြစ်ရင် သူ့ကို စောင့်ကြည့်နေတဲ့ objects တွေကို အလိုအလျောက် notify လုပ်ပေးတဲ့ subscription mechanism ပါ။"
    },
    tags: ['design patterns', 'behavioral', 'observer'],
    codeSnippet: {
      initial: `// Polling (Inefficient)
while(true) {
  if (store.hasNewData()) {
     ui.update();
  }
}`,
      solution: `// Subscription (Push)
store.subscribe((data) => {
  ui.update(data);
});

// When store updates, it loops through
// subscribers and calls them.`
    }
  },
  { 
    question: "Intent: Strategy Pattern", 
    answer: {
      en: "To encapsulate a family of algorithms in separate classes, making them interchangeable at runtime.",
      mm: "$Algorithms$ အုပ်စုတစ်ခုကို သီးသန့် classes တွေအဖြစ် ခွဲထုတ်ထားပြီး၊ runtime ကျမှ လိုချင်တာကို လဲသုံးလို့ရအောင် လုပ်တာပါ။"
    },
    tags: ['design patterns', 'behavioral', 'strategy'],
    codeSnippet: {
      initial: `class Navigator {
  buildRoute(type) {
    if (type === 'road') ...
    if (type === 'walking') ...
  }
}`,
      solution: `interface RouteStrategy { build(): void; }

class RoadStrategy implements RouteStrategy { ... }
class WalkingStrategy implements RouteStrategy { ... }

// Context switches strategy at runtime
nav.setStrategy(new RoadStrategy());`
    }
  },
  { 
    question: "Intent: Command Pattern", 
    answer: {
      en: "To turn a request into a stand-alone object containing all information about the request.",
      mm: "$Request$ တစ်ခုကို လိုအပ်တဲ့ info တွေအားလုံးပါတဲ့ stand-alone object အဖြစ် ပြောင်းလိုက်တာပါ။"
    },
    tags: ['design patterns', 'behavioral', 'command'] 
  },
  { 
    question: "Intent: State Pattern", 
    answer: {
      en: "To allow an object to alter its behavior when its internal state changes, appearing as if its class has changed.",
      mm: "$Object$ တစ်ခုရဲ့ internal state ပြောင်းသွားရင် behavior ပါ ပြောင်းသွားအောင် လုပ်တာပါ။ Class ပြောင်းသွားသလို ခံစားရစေတယ်။"
    },
    tags: ['design patterns', 'behavioral', 'state'] 
  },
  { 
    question: "Intent: Visitor Pattern", 
    answer: {
      en: "To separate algorithms from the objects on which they operate by adding operations without modifying the objects.",
      mm: "$Objects$ တွေကို မပြင်ဘဲနဲ့ သူတို့အပေါ်မှာ run မယ့် operations တွေကို သီးသန့်ခွဲထုတ်ပြီး algorithms အသစ်ထည့်တာပါ။"
    },
    tags: ['design patterns', 'behavioral', 'visitor'] 
  },
  { 
    question: "Intent: Mediator Pattern", 
    answer: {
      en: "To reduce chaotic dependencies between objects by forcing them to collaborate through a central coordinator object.",
      mm: "$Objects$ တွေအချင်းချင်း ရှုပ်ပွပြီး ဆက်သွယ်နေမယ့်အစား၊ ကြားခံ coordinator object ကနေတဆင့် ပူးပေါင်းလုပ်ဆောင်ခိုင်းတာပါ။"
    },
    tags: ['design patterns', 'behavioral', 'mediator'] 
  },
  { 
    question: "Intent: Memento Pattern", 
    answer: {
      en: "To save and restore the previous state of an object without revealing its internal implementation details.",
      mm: "$Object$ တစ်ခုရဲ့ internal implementation ကို မဖော်ပြဘဲနဲ့၊ သူ့ရဲ့ အရင် state ကို save ပြီး ပြန် restore လုပ်လို့ရအောင် လုပ်တာပါ။"
    },
    tags: ['design patterns', 'behavioral', 'memento'] 
  },
  { 
    question: "In TypeScript, what is a 'type variable' used for in generics?", 
    answer: {
      en: "It is a special variable that works on types rather than values to capture type information provided by the user.",
      mm: "$Values$ တွေအစား $Types$ တွေအပေါ်မှာ အလုပ်လုပ်ဖို့ပါ။ User ပေးလိုက်တဲ့ type information ကို ဖမ်းယူဖို့ သုံးပါတယ်။"
    },
    tags: ['typescript', 'generics'],
    codeSnippet: {
      initial: `function identity(arg: any): any {
  return arg; // Loses type info
}
const output = identity("string");
// output is 'any'`,
      solution: `function identity<T>(arg: T): T {
  return arg;
}
const output = identity("string");
// output is 'string' (preserved)`
    }
  },
  { 
    question: "How does the TypeScript compiler handle type information when using the any type instead of generics?", 
    answer: {
      en: "It accepts any type but loses the specific information about the type when the function returns.",
      mm: "ဘယ် type မဆို လက်ခံပေမယ့်၊ function က return ပြန်လာတဲ့အခါ type အချက်အလက်တွေ ပျောက်သွားရော။"
    },
    tags: ['typescript'] 
  },
  { 
    question: "What is 'type argument inference' in TypeScript generics?", 
    answer: {
      en: "The compiler automatically sets the value of the type parameter based on the type of the argument passed in.",
      mm: "ထည့်ပေးလိုက်တဲ့ argument ရဲ့ type ကိုကြည့်ပြီး compiler က type parameter တန်ဖိုးကို အလိုအလျောက် သတ်မှတ်ပေးတာပါ။"
    },
    tags: ['typescript', 'generics'] 
  },
  { 
    question: "How can a developer constrain a generic type to only allow types that possess a specific property like .length?", 
    answer: {
      en: "By using the extends keyword with an interface that defines the required property.",
      mm: "လိုချင်တဲ့ property ပါတဲ့ interface တစ်ခုဆောက်ပြီး $extends$ keyword နဲ့ တွဲသုံးလိုက်ရင် ရပါပြီ။"
    },
    tags: ['typescript', 'generics'],
    codeSnippet: {
      initial: `function logLength<T>(arg: T) {
  console.log(arg.length); // Error: T doesn't imply .length
}`,
      solution: `interface Lengthwise { length: number; }

function logLength<T extends Lengthwise>(arg: T) {
  console.log(arg.length); // OK
}`
    }
  },
  { 
    question: "In TypeScript generics, what is the 'static side' restriction for generic classes?", 
    answer: {
      en: "Static members cannot use the class's generic type parameter.",
      mm: "Static members တွေက class ရဲ့ generic type parameter ကို ယူသုံးလို့ မရပါဘူး။"
    },
    tags: ['typescript', 'generics'] 
  },
  { 
    question: "Concept: Covariance in Generic Types", 
    answer: {
      en: "The relationship where Producer<Cat> can be used where Producer<Animal> is expected because a Cat is an Animal.",
      mm: "$Cat$ က $Animal$ ဖြစ်တဲ့အတွက် $Producer<Cat>$ ကို $Producer<Animal>$ နေရာမှာ အစားထိုးသုံးလို့ရတဲ့ ဆက်နွယ်မှုပါ။"
    },
    tags: ['typescript', 'generics', 'theory'] 
  },
  { 
    question: "Concept: Contravariance in Generic Types", 
    answer: {
      en: "The relationship where Consumer<Animal> can be used where Consumer<Cat> is expected because a function accepting an Animal can also accept a Cat.",
      mm: "$Animal$ ကိုလက်ခံတဲ့ function က $Cat$ ကိုလည်း လက်ခံနိုင်တဲ့အတွက်၊ $Consumer<Animal>$ ကို $Consumer<Cat>$ နေရာမှာ သုံးလို့ရတာပါ။"
    },
    tags: ['typescript', 'generics', 'theory'] 
  },
  { 
    question: "What is the 'Compound Components Pattern' in React?", 
    answer: {
      en: "A design pattern where a parent and child components work together to share implicit state and behavior for flexible UI composition.",
      mm: "Parent နဲ့ Child components တွေ ပူးပေါင်းပြီး state တွေ behavior တွေ မျှဝေသုံးစွဲတဲ့ design pattern ပါ။ UI composition ကို flexible ဖြစ်စေတယ်။"
    },
    tags: ['react', 'patterns'],
    codeSnippet: {
      initial: `// Rigid configuration props
<Tabs 
  items={[{label: 'A', content: '...'}]} 
  onChange={...} 
/>`,
      solution: `// Flexible Composition
<Tabs>
  <Tabs.List>
     <Tabs.Trigger value="a">A</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="a">...</Tabs.Content>
</Tabs>`
    }
  },
  { 
    question: "What specific code smell does the Compound Components pattern help eliminate?", 
    answer: {
      en: "Prop Drilling, or 'Prop Soup,' where a long list of props is passed through multiple levels.",
      mm: "Prop Drilling (Prop Soup) ပါ။ Props တွေကို အဆင့်ဆင့် လက်ဆင့်ကမ်းနေရတာမျိုး မလိုတော့ဘူးလေ။"
    },
    tags: ['react', 'clean code'] 
  },
  { 
    question: "In the Compound Components pattern, why are subcomponents often attached to the parent component object (e.g., Modal.Header)?", 
    answer: {
      en: "To improve discoverability and signal that the subcomponent is only intended to be used within that specific parent context.",
      mm: "ဒီ subcomponent ဟာ ဒီ parent context ထဲမှာပဲ သုံးဖို့ရည်ရွယ်တယ်ဆိုတာ သိသာစေဖို့နဲ့ ရှာဖွေရလွယ်အောင်ပါ။"
    },
    tags: ['react', 'patterns'] 
  },
  { 
    question: "What is a significant pitfall of overusing the Compound Components pattern?", 
    answer: {
      en: "It can lead to deeply nested structures or make debugging difficult if the shared state is not well-documented.",
      mm: "Nested structures တွေ အရမ်းများသွားနိုင်တယ်။ Shared state ကို သေချာ documented မလုပ်ထားရင် debug လုပ်ရ ခက်နိုင်တယ်။"
    },
    tags: ['react', 'patterns'] 
  },
  { 
    question: "According to the study of the JHotDraw framework, what is the relationship between design patterns and code quality?", 
    answer: {
      en: "A strong correlation was found between the high density of design patterns and improved maintainability ratings.",
      mm: "Design patterns တွေ များများသုံးထားရင် maintainability ratings ပိုကောင်းတာ တွေ့ရပါတယ်။"
    },
    tags: ['clean code', 'design patterns'] 
  },
  { 
    question: "What is the 'trade-off' mentioned regarding the application of design patterns for software quality?", 
    answer: {
      en: "Patterns may enhance certain quality aspects, such as maintainability, while potentially detracting from others, like performance.",
      mm: "Maintainability လိုမျိုး တချို့အပိုင်းတွေ ကောင်းလာပေမယ့်၊ Performance လို အပိုင်းတွေမှာတော့ လျော့ကျသွားနိုင်ပါတယ်။"
    },
    tags: ['design patterns'] 
  },
  { 
    question: "In Angular, what is the 'Signal-first' trend?", 
    answer: {
      en: "A shift toward using synchronous, declarative state management for UI components while retaining Observables for async workflows.",
      mm: "UI components တွေအတွက် synchronous, declarative state management ကို ဦးစားပေးသုံးလာတာပါ။ Async workflows တွေအတွက်တော့ Observables ကို ဆက်သုံးပါတယ်။"
    },
    tags: ['angular', 'signals'] 
  },
  { 
    question: "What does the 'design:paramtypes' metadata represent in a TypeScript DI container?", 
    answer: {
      en: "An array of the constructor parameter types emitted by the compiler for a specific class.",
      mm: "$Class$ တစ်ခုရဲ့ constructor parameter types တွေကို compiler က ထုတ်ပေးလိုက်တဲ့ array တစ်ခုပါ။"
    },
    tags: ['typescript', 'di'] 
  },
  { 
    question: "Why is 'Code Reuse' often difficult to achieve without design patterns?", 
    answer: {
      en: "Tight coupling and dependencies on concrete classes reduce the flexibility needed to adapt code to new contexts.",
      mm: "Tight coupling ဖြစ်နေတာနဲ့ Concrete classes တွေကို မှီခိုနေရတာကြောင့် code ကို နေရာသစ်မှာ ပြန်သုံးဖို့ flexibility နည်းသွားလို့ပါ။"
    },
    tags: ['clean code', 'design patterns'] 
  },
  { 
    question: "In React, what does the children prop enable in the context of compound components?", 
    answer: {
      en: "It allows the consumer to pass any HTML elements or React components to be rendered within the parent's layout.",
      mm: "Parent ရဲ့ layout ထဲမှာ consumer က ကြိုက်တဲ့ HTML elements တွေ၊ React components တွေ ထည့်သုံးခွင့် ပေးလိုက်တာပါ။"
    },
    tags: ['react'] 
  },
  { 
    question: "What is the 'Hollywood Principle' mentioned by Erich Gamma?", 
    answer: {
      en: "The 'Don't call us, we'll call you' concept used in frameworks where the framework calls your custom code.",
      mm: "'မင်း ငါတို့ကို လှမ်းမခေါ်နဲ့၊ ငါတို့ပဲ မင်းကို လှမ်းခေါ်မယ်' ဆိုတဲ့ concept ပါ။ Framework ကနေ ကိုယ့်ရဲ့ custom code ကို လှမ်းခေါ်တာမျိုးပေါ့။"
    },
    tags: ['design patterns', 'architecture'] 
  },
  { 
    question: "How does the Template Method pattern define the structure of an algorithm?", 
    answer: {
      en: "It defines the skeleton in a superclass but allows subclasses to override specific steps without changing the structure.",
      mm: "Superclass မှာ အရိုးစု (skeleton) ကို သတ်မှတ်ထားပြီး၊ subclass တွေက structure မပျက်စေဘဲ လိုအပ်တဲ့ အဆင့်တွေကို override လုပ်ခွင့်ပေးတာပါ။"
    },
    tags: ['design patterns', 'behavioral'] 
  },
  { 
    question: "What is the difference between an IoC Container's register and resolve methods?", 
    answer: {
      en: "The register method stores the provider's definition, while resolve recursively instantiates and returns the requested service.",
      mm: "$register$ က provider definition ကို သိမ်းပေးတာ၊ $resolve$ ကတော့ တောင်းဆိုလာတဲ့ service ကို recursively instantiate လုပ်ပြီး ပြန်ပေးတာပါ။"
    },
    tags: ['di', 'architecture'] 
  },
  { 
    question: "In TypeScript generics, how do you specify a default type for a type parameter?", 
    answer: {
      en: "By using the syntax <T = DefaultType> in the type parameter list.",
      mm: "Type parameter list မှာ $<T = DefaultType>$ ဆိုတဲ့ syntax သုံးပြီး သတ်မှတ်နိုင်ပါတယ်။"
    },
    tags: ['typescript', 'generics'] 
  },
  { 
    question: "What is the 'Prop Soup' code smell in React?", 
    answer: {
      en: "A situation where a component is bloated with an excessive number of props to handle every possible configuration and child behavior.",
      mm: "Component တစ်ခုက configuration တွေအများကြီးနဲ့ child behavior တွေ အကုန် handle လုပ်ဖို့ props တွေ အလွန်အကျွံ လက်ခံထားရတဲ့ အခြေအနေပါ။"
    },
    tags: ['react', 'clean code', 'smells'] 
  },
  { 
    question: "What is the primary benefit of the 'Program to an Interface, not an Implementation' principle?", 
    answer: {
      en: "It allows the client code to remain independent of the concrete classes it uses, making the system easier to extend.",
      mm: "Client code က concrete classes တွေကို မမှီခိုတော့ဘဲ၊ system ကို extend လုပ်ရတာ ပိုလွယ်ကူသွားစေပါတယ်။"
    },
    tags: ['clean code', 'design principles'] 
  },
  { 
    question: "In the 37signals handbook, what is the role of a 'Tech Lead' regarding pull requests?", 
    answer: {
      en: "They are responsible for reviewing a report’s substantial pull requests before they are shipped.",
      mm: "သူတို့အောက်က လူတွေ (report) ရဲ့ အရေးပါတဲ့ pull requests တွေကို ship မလုပ်ခင် ဝင်စစ်ဆေးပေးရပါတယ်။"
    },
    tags: ['career', 'clean code'] 
  },
  { 
    question: "What does the term 'Judo Opportunity' refer to in the programmer levels context?", 
    answer: {
      en: "Finding ways to achieve project goals with significantly less effort or by simplifying requirements.",
      mm: "Project goals တွေကို အားသိပ်မစိုက်ရဘဲ ပြီးမြောက်အောင် လုပ်နည်းရှာတာ၊ ဒါမှမဟုတ် requirements တွေကို ရိုးရှင်းအောင် လုပ်လိုက်တာမျိုးပါ။"
    },
    tags: ['career', 'clean code'] 
  },
  { 
    question: "Why is the 'Visitor' pattern often considered harder to understand than 'Observer'?", 
    answer: {
      en: "It involves complex double-dispatching and separates the algorithm completely from the object structure.",
      mm: "သူက double-dispatching တွေပါလို့ ရှုပ်ထွေးသလို၊ algorithm ကို object structure ကနေ လုံးဝ ခွဲထုတ်ပစ်လိုက်လို့ပါ။"
    },
    tags: ['design patterns', 'behavioral'] 
  }
];