

type KeyOf<T> = keyof T

type ValueOf<T> = T[keyof T]

type FieldRecord<T> = {
    [K in KeyOf<T>]?: ValueOf<T>;
};

const SplitObject = <T extends Object>(data: T,GetField :Array<KeyOf<T>>) => {
    if(!data && typeof data !== "object"){
       return {}
    }

    let object1:FieldRecord<T> = {}
    let object2:FieldRecord<T> = {}

    const keys = Object.keys(data) as Array<KeyOf<T>>

    keys.forEach(key => {
        if(GetField.includes(key)){
            object1[key] = data[key]
        }else{
            object2[key] = data[key]
        }
    })

    return {
        object1,
        object2
    }
}

export {
    SplitObject
}