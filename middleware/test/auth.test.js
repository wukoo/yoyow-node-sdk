"use strict"
import assert from 'assert';
import auth from '../lib/Auth'
import config from '../conf/config';
import {yoyowSDK} from '../lib/yoyow-node-sdk'

let {Apis} = yoyowSDK;
let signObj ;

/**
 * 测试 授权
 * @test {Auth}
 */
describe('Auth test', function(){

    before(() => {
        return Apis.instance(config.apiServer, true).init_promise.then(function (result) {
            console.log('before Connect success');
        });
    });

    after(() => {
        Apis.close();
        signObj = null;
    });

    /**
     * 平台签名
     * @test {Auth#sign}
     */
    it('平台签名', () => {
        signObj = auth.sign('platform', config.platform_id, config.secondary_key);
        console.log('签名结果');
        console.log(signObj);
        assert(signObj.uid == config.platform_id);
    });

    /**
     * 平台验签
     * @test {Auth#verify}
     */
    it('平台验签', () => {
        return new Promise((resolve, reject) => {
            auth.verify('platform', signObj.sign, signObj.time, signObj.uid).then(vObj => {
                console.log('验签结果');
                console.log(vObj);
                assert(vObj.verify)
                resolve();
            }).catch(e => {
                reject(e);
            });
        });
    });

    /**
     * yoyow签名
     * @test {Auth#sign}
     */
    it('yoyow签名', () => {
        signObj = auth.sign('yoyow', config.platform_id, config.secondary_key);
        console.log('签名结果');
        console.log(signObj);
        assert(signObj.uid == config.platform_id);
    })

    /**
     * yoyow验签
     * @test {Auth#verify}
     */
    it('yoyow验签', () => {
        return new Promise((resolve, reject) => {
            auth.verify('yoyow', signObj.sign, signObj.time, signObj.uid).then(vObj => {
                console.log('验签结果');
                console.log(vObj);
                assert(vObj.verify)
                resolve();
            }).catch(e => {
                reject(e);
            });
        });
    })
});