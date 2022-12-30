export const reactive = <T extends object>(target: T) => {
    return new Proxy(target, {
        get(target, key, receiver) {
            let res = Reflect.get(target, key, receiver)
            return res
        },
        set(target, key, receiver) {
            let res = Reflect.set(target, key, receiver)
            return res
        }
    })
}
reactive({})