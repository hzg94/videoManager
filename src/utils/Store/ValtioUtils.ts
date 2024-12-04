import {proxy,snapshot,subscribe} from "umi";

export function proxyWithPersist<V>(InitVal: V, opts: {
    key: string;
}) {

    const local = localStorage.getItem(opts.key);

    const state = proxy(local ? JSON.parse(local) : InitVal);

    subscribe(state, () => {
        localStorage.setItem(opts.key, JSON.stringify(snapshot(state)));
    });

    return state;
}