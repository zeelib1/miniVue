import { Effect, State } from "../interfaces/reactive";

let activeEffect: Effect | null = null;

class Dep {
  subscribers: Set<Effect> = new Set();

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  notify() {
    this.subscribers.forEach((effect) => {
      effect();
    });
  }
}

export function watchEffect(effect: Effect) {
  activeEffect = effect;
  // console.log(`Registering effect: ${effect}`);

  effect();
  activeEffect = null;
}

const targetMap = new WeakMap<object, Map<PropertyKey, Dep>>();

function getDep(target: object, key: PropertyKey): Dep {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map<PropertyKey, Dep>();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }
  return dep;
}

const reactiveHandlers: ProxyHandler<object> = {
  get(target, key, receiver) {
    const dep = getDep(target, key);
    dep.depend();
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    const dep = getDep(target, key);
    const result = Reflect.set(target, key, value, receiver);
    dep.notify();
    return result;
  },
};

export function reactive<T extends object>(raw: T): T {
  return new Proxy<T>(raw, reactiveHandlers);
}

// // Example usage
// const state = reactive<State>({
//   count: 0,

// });

// watchEffect(() => {
//   console.log(state.count);
// });

// state.count = 1;
