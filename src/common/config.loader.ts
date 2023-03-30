import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

const ENV = process.env.NODE_ENV;
export default () => {
    const baseSettings = JSON.parse(readFileSync(path.resolve(__dirname, '../../config', 'base.json'), 'utf8'));
    const envSettings = JSON.parse(readFileSync(path.resolve(__dirname, '../../config', `${ENV}.json`), 'utf8'));
    const final = mergeDeep(baseSettings, envSettings);
    return yaml.load(JSON.stringify(final)) as Record<string, any>;
};

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}
