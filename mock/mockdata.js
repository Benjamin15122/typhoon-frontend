
const mockdata = {
    "timestamp": 1573893117, "duration": 60,
    "graphType": "versionedApp", "elements": {
        "nodes": [{
            "data": {
                "id": "2030c1347737df055a4af13bb033791a", "nodeType": "service",
                "namespace": "typhoon",
                "app": "frontend",
                "service": "frontend",
                "destServices": [
                    {
                        "namespace": "typhoon", "name": "frontend"
                    }],
                "hasVS": true,
                "isRoot": true
            }
        }, {
            "data": {
                "id": "73dba679f824a4b2ac5444737e93c4e1", "nodeType": "app",
                "namespace": "typhoon",
                "workload": "frontend-v1",
                "app": "frontend",
                "version": "v1",
                "isUnused": true
            }
        },
        {
            "data": {
                "id": "3314583b4b6681d773898751294e54d8", "nodeType": "app",
                "namespace": "typhoon",
                "workload": "frontend-v2",
                "app": "frontend", "version": "v2", "destServices": [
                    {
                        "namespace": "typhoon", "name": "frontend"
                    }]
            }
        },
        {
            "data": {
                "id": "6fedbdc90864b88a1660aac7f78beaad", "nodeType": "service",
                "namespace": "typhoon",

                "app": "rain-changzhou", "service": "rain-changzhou", "destServices": [
                    {
                        "namespace": "typhoon", "name": "rain-changzhou"
                    }],
                "hasVS": true
            }
        }, {
            "data": {
                "id": "db0f1057913ab540623e225cd9154888", "nodeType": "app",
                "namespace": "typhoon",
                "workload": "rain-changzhou-v1",
                "app": "rain-changzhou",
                "version": "v1",
                "destServices": [
                    {
                        "namespace": "typhoon", "name": "rain-changzhou"
                    }]
            }
        },
        {
            "data": {
                "id": "1669fd4cf97cc8f7ffd9a8374da37699", "nodeType": "service",
                "namespace": "typhoon",
                "app": "rain-hefei",
                "service": "rain-hefei", "destServices": [
                    {
                        "namespace": "typhoon", "name": "rain-hefei"
                    }],
                "hasVS": true
            }
        }, {
            "data": {
                "id": "f994a6af32e216ae2a193c1febb7de74", "nodeType": "app",
                "namespace": "typhoon",
                "workload": "rain-hefei-v1",
                "app": "rain-hefei",
                "version": "v1",
                "destServices": [
                    {
                        "namespace": "typhoon", "name": "rain-hefei"

                    }]
            }
        },
        {
            "data": {
                "id": "50974761dced3da3ac6aed860b548e24", "nodeType": "service",
                "namespace": "typhoon",
                "app": "rain-maanshan",
                "service": "rain-maanshan", "destServices": [
                    {
                        "namespace": "typhoon", "name": "rain-maanshan"
                    }],
                "hasVS": true
            }
        }, {
            "data": {
                "id": "f2a94b202931d03be2f873f0d1c9a5a5", "nodeType": "app",
                "namespace": "typhoon",
                "workload": "rain-maanshan-v1",
                "app": "rain-maanshan",
                "version": "v1",
                "destServices": [
                    {
                        "namespace": "typhoon", "name": "rain-maanshan"
                    }]
            }
        },
        {
            "data": {
                "id": "f8fbc3075ea3918b1a9c47b1543633dc", "nodeType": "service",
                "namespace": "typhoon",
                "app": "rain-nanjing",
                "service": "rain-nanjing", "destServices": [
                    {
                        "namespace": "typhoon", "name": "rain-nanjing"
                    }],
                "hasVS": true
            }
        }, {
            "data": {
                "id": "a0ff1e33984425198a16bcdc28951497",

                "nodeType": "app", "namespace": "typhoon", "workload": "rain-nanjing-v1", "app": "rain-nanjing", "version": "v1", "destServices": [
                    {
                        "namespace": "typhoon", "name": "rain-nanjing"
                    }]
            }
        },
        {
            "data": {
                "id": "bed6f4bd8d0e20ffb966394aaa7a9c34", "nodeType": "service",
                "namespace": "typhoon",
                "app": "rain-shanghai",
                "service": "rain-shanghai", "destServices": [
                    {
                        "namespace": "typhoon", "name": "rain-shanghai"
                    }],
                "hasVS": true
            }
        }, {
            "data": {
                "id": "acb045f1be03f6c4371523a714b83e98", "nodeType": "app",
                "namespace": "typhoon",
                "workload": "rain-shanghai-v1",
                "app": "rain-shanghai",
                "version": "v1",
                "destServices": [
                    {
                        "namespace": "typhoon", "name": "rain-shanghai"
                    }]
            }
        },
        {
            "data": {
                "id": "206dc8b8717af482967b81f86c317ff5", "nodeType": "service",
                "namespace": "typhoon",
                "app": "rain-suzhou",
                "service": "rain-suzhou", "destServices": [
                    {
                        "namespace": "typhoon",

                        "name": "rain-suzhou"
                    }
                ],
                "hasVS": true
            }
        }, {
            "data": {
                "id": "6a337722137812a8da7c5211d96970d4", "nodeType": "app",
                "namespace": "typhoon",
                "workload": "rain-suzhou-v1",
                "app": "rain-suzhou",
                "version": "v1",
                "destServices": [
                    {
                        "namespace": "typhoon", "name": "rain-suzhou"
                    }]
            }
        },
        {
            "data": {
                "id": "ca915b5cac4b04b804de2fb765a400a9", "nodeType": "service",
                "namespace": "typhoon",
                "app": "raincontroller",
                "service": "raincontroller", "destServices": [
                    {
                        "namespace": "typhoon", "name": "raincontroller"
                    }],
                "traffic": [{
                    "protocol": "http", "rates": {
                        "httpIn": "0.42", "httpIn5xx": "0.42", "httpOut": "0.42"
                    }
                }
                ],
                "hasVS": true
            }
        }, {
            "data": {
                "id": "a6e8b9c7251712237a846fcb4284760a", "nodeType": "app",
                "namespace": "typhoon",
                "workload": "raincontroller-v1",
                "app": "raincontroller",

                "version": "v1", "destServices": [
                    {
                        "namespace": "typhoon", "name": "raincontroller"
                    }],
                "traffic": [{
                    "protocol": "http", "rates": {
                        "httpIn": "0.42", "httpIn5xx": "0.42", "httpOut": "0.42"
                    }
                }
                ]
            }
        }, {
            "data": {
                "id": "af6ff19432f88bc230bf78e983c56081", "nodeType": "service",
                "namespace": "typhoon",
                "app": "typhoon",
                "service": "typhoon",
                "destServices": [
                    {
                        "namespace": "typhoon", "name": "typhoon"
                    }],
                "traffic": [{
                    "protocol": "http", "rates": {
                        "httpIn": "0.84", "httpIn5xx": "0.84", "httpOut": "0.84"
                    }
                }
                ],
                "hasVS": true
            }
        }, {
            "data": {
                "id": "9a0539036cce6825a44e9fe875789edf", "nodeType": "app",
                "namespace": "typhoon",
                "workload": "typhoon-v1",
                "app": "typhoon",
                "version": "v1",
                "destServices": [
                    {

                        "namespace": "typhoon",
                        "name": "typhoon"
                    }
                ], "traffic": [
                    {
                        "protocol": "http", "rates": {
                            "httpIn": "0.84",
                            "httpIn5xx": "0.84"
                        }
                    }]
            }
        },
        {
            "data": {
                "id": "07e178d53947df0378abd561efb478c8", "nodeType": "service",
                "namespace": "typhoon",
                "app": "wind-changzhou",
                "service": "wind-changzhou", "destServices": [
                    {
                        "namespace": "typhoon", "name": "wind-changzhou"
                    }],
                "hasVS": true
            }
        }, {
            "data": {
                "id": "b67bf3b6e1c21fde20b71f51703e69dc", "nodeType": "app",
                "namespace": "typhoon",
                "workload": "wind-changzhou-v1",
                "app": "wind-changzhou",
                "version": "v1",
                "destServices": [
                    {
                        "namespace": "typhoon", "name": "wind-changzhou"
                    }]
            }
        },
        {
            "data": {
                "id": "c10ceeb7661110bf89efd44bd9135e46", "nodeType": "service",
                "namespace": "typhoon",
                "app": "wind-hefei",
                "service": "wind-hefei", "destServices": [

                    {
                        "namespace": "typhoon", "name": "wind-hefei"
                    }],
                "hasVS": true
            }
        }, {
            "data": {
                "id": "43630fd327907187cef9ee23e52cd354", "nodeType": "app",
                "namespace": "typhoon",
                "workload": "wind-hefei-v1",
                "app": "wind-hefei",
                "version": "v1",
                "destServices": [
                    {
                        "namespace": "typhoon", "name": "wind-hefei"
                    }]
            }
        },
        {
            "data": {
                "id": "87ca1c2da7797b39975588b0fff974b0", "nodeType": "service",
                "namespace": "typhoon",
                "app": "wind-maanshan",
                "service": "wind-maanshan", "destServices": [
                    {
                        "namespace": "typhoon", "name": "wind-maanshan"
                    }],
                "hasVS": true
            }
        }, {
            "data": {
                "id": "3c3f744b32b4c40c827a922fc2d7f103", "nodeType": "app",
                "namespace": "typhoon",
                "workload": "wind-maanshan-v1",
                "app": "wind-maanshan",
                "version": "v1",
                "destServices": [
                    {
                        "namespace": "typhoon", "name": "wind-maanshan"
                    }]
            }

        }, {
            "data": {
                "id": "896e4e9409e5a067776ad551c9102f5f", "nodeType": "service",
                "namespace": "typhoon",
                "app": "wind-nanjing",
                "service": "wind-nanjing",
                "destServices": [
                    {
                        "namespace": "typhoon", "name": "wind-nanjing"
                    }],
                "hasVS": true
            }
        }, {
            "data": {
                "id": "394de955fea821285847cb8e5623f0b3", "nodeType": "app",
                "namespace": "typhoon",
                "workload": "wind-nanjing-v1",
                "app": "wind-nanjing",
                "version": "v1",
                "destServices": [
                    {
                        "namespace": "typhoon", "name": "wind-nanjing"
                    }]
            }
        },
        {
            "data": {
                "id": "e84e6bf4e15960b10f6eded966c440de", "nodeType": "service",
                "namespace": "typhoon",
                "app": "wind-shanghai",
                "service": "wind-shanghai", "destServices": [
                    {
                        "namespace": "typhoon", "name": "wind-shanghai"
                    }],
                "hasVS": true
            }
        }, {
            "data": {
                "id": "ae59cac7c6f767bc8c1cb7842b2e440c", "nodeType": "app",
                "namespace": "typhoon",
                "workload": "wind-shanghai-v1",

                "app": "wind-shanghai", "version": "v1", "destServices": [
                    {
                        "namespace": "typhoon", "name": "wind-shanghai"
                    }]
            }
        },
        {
            "data": {
                "id": "89e6d075842608e2dcd23697b7276c05", "nodeType": "service",
                "namespace": "typhoon",
                "app": "wind-suzhou",
                "service": "wind-suzhou", "destServices": [
                    {
                        "namespace": "typhoon", "name": "wind-suzhou"
                    }],
                "hasVS": true
            }
        }, {
            "data": {
                "id": "fd1c4fdaab1a3f48bc63a4cc6f3ea5dc", "nodeType": "app",
                "namespace": "typhoon",
                "workload": "wind-suzhou-v1",
                "app": "wind-suzhou",
                "version": "v1",
                "destServices": [
                    {
                        "namespace": "typhoon", "name": "wind-suzhou"
                    }]
            }
        },
        {
            "data": {
                "id": "a32230d965e95fe905adfbe5bfa7c39c", "nodeType": "service",
                "namespace": "typhoon",
                "app": "windcontroller",
                "service": "windcontroller", "destServices": [
                    {
                        "namespace": "typhoon", "name": "windcontroller"
                    }],

                "traffic": [{
                    "protocol": "http", "rates": {
                        "httpIn": "0.42", "httpIn5xx": "0.42", "httpOut": "0.42"
                    }
                }
                ],
                "hasVS": true
            }
        }, {
            "data": {
                "id": "f26ffc7dea2747259e57fb478989f358", "nodeType": "app",
                "namespace": "typhoon",
                "workload": "windcontroller-v1",
                "app": "windcontroller",
                "version": "v1",
                "destServices": [
                    {
                        "namespace": "typhoon", "name": "windcontroller"
                    }],
                "traffic": [{
                    "protocol": "http", "rates": {
                        "httpIn": "0.42", "httpIn5xx": "0.42", "httpOut": "0.42"
                    }
                }
                ]
            }
        }, {
            "data": {
                "id": "d7c639544a7810a8d021b64538e4e435", "nodeType": "service",
                "namespace": "unknown",
                "service": "PassthroughCluster", "destServices": [
                    {
                        "namespace": "unknown", "name": "PassthroughCluster"
                    }],
                "isInaccessible": true
            }
        }, {

            "data": {
                "id": "b30b0078325bf2e1adb4d57c4c0c2665", "nodeType": "unknown",
                "namespace": "unknown",
                "workload": "unknown",
                "app": "unknown",
                "version": "unknown",
                "traffic": [
                    {
                        "protocol": "http", "rates": {
                            "httpOut": "0.84"
                        }
                    }],
                "isInaccessible": true,
                "isRoot": true
            }
        }],
        "edges": [{
            "data": {
                "id": "3c5cc4d98ebaf30e95a0a5b2d5abce75", "source": "07e178d53947df0378abd561efb478c8", "target": "b67bf3b6e1c21fde20b71f51703e69dc", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "7d2a7753892c40def8edce363cd1fb69", "source": "1669fd4cf97cc8f7ffd9a8374da37699", "target": "f994a6af32e216ae2a193c1febb7de74", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "c316d93f91b360ee8f362f4dfdf3b898", "source": "2030c1347737df055a4af13bb033791a", "target": "3314583b4b6681d773898751294e54d8", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "d517a315c888b9a8a8fa90bc464fbc65", "source": "206dc8b8717af482967b81f86c317ff5",

                "target": "6a337722137812a8da7c5211d96970d4", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "2b0ef95a6c1e4c558e50c062d47cc03b", "source": "3314583b4b6681d773898751294e54d8", "target": "d7c639544a7810a8d021b64538e4e435", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "f3a24b1d13586837a32b5d8cf33143e7", "source": "50974761dced3da3ac6aed860b548e24", "target": "f2a94b202931d03be2f873f0d1c9a5a5", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "f4a5c6186ec619548d63ded214e1a148", "source": "6fedbdc90864b88a1660aac7f78beaad", "target": "db0f1057913ab540623e225cd9154888", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "5920c880a64af54256c98f98121a2d0b", "source": "87ca1c2da7797b39975588b0fff974b0", "target": "3c3f744b32b4c40c827a922fc2d7f103", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "74265a29f2122fbd291ae05abeb9f5d9", "source": "896e4e9409e5a067776ad551c9102f5f", "target": "394de955fea821285847cb8e5623f0b3", "traffic": {
                    "protocol": "http"
                }
            }

        }, {
            "data": {
                "id": "6bd0848afc1a4d667729047d9bfb0268", "source": "89e6d075842608e2dcd23697b7276c05", "target": "fd1c4fdaab1a3f48bc63a4cc6f3ea5dc", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "fd8796c92ee1f7f55095e137133c9f9b", "source": "a32230d965e95fe905adfbe5bfa7c39c", "target": "f26ffc7dea2747259e57fb478989f358", "traffic": {
                    "protocol": "http", "rates": {
                        "http": "0.42",
                        "http5xx": "0.42", "httpPercentErr": "100.0", "httpPercentReq": "100.0"
                    }, "responses": {
                        "500": {
                            "flags": {
                                "-": "100.0"
                            },
                            "hosts": {
                                "windcontroller.typhoon.svc.cluster.local": "100.0"
                            }
                        }
                    }
                }
            }
        },
        {
            "data": {
                "id": "936b18759ebdd3c83cae3c0ba1beea73", "source": "a6e8b9c7251712237a846fcb4284760a", "target": "1669fd4cf97cc8f7ffd9a8374da37699", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "5e36af2d39433923b02790875aadeb3e", "source": "a6e8b9c7251712237a846fcb4284760a", "target": "206dc8b8717af482967b81f86c317ff5", "traffic": {
                    "protocol": "http"
                }

            }
        },
        {
            "data": {
                "id": "27e442b2d201945b45d83f452495c4fc", "source": "a6e8b9c7251712237a846fcb4284760a", "target": "50974761dced3da3ac6aed860b548e24", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "523052a77375da8bdb85543db381d066", "source": "a6e8b9c7251712237a846fcb4284760a", "target": "6fedbdc90864b88a1660aac7f78beaad", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "7ffb4d99394072c01d6404cf6f1cc48d", "source": "a6e8b9c7251712237a846fcb4284760a", "target": "af6ff19432f88bc230bf78e983c56081", "traffic": {
                    "protocol": "http", "rates": {
                        "http": "0.42",
                        "http5xx": "0.42", "httpPercentErr": "100.0", "httpPercentReq": "100.0"
                    }, "responses": {
                        "500": {
                            "flags": {
                                "-": "100.0"
                            },
                            "hosts": {
                                "typhoon.typhoon.svc.cluster.local": "100.0"
                            }
                        }
                    }
                }
            }
        },
        {
            "data": {
                "id": "6e25511cfe6f1b2712af65259d6b1d37", "source": "a6e8b9c7251712237a846fcb4284760a", "target": "bed6f4bd8d0e20ffb966394aaa7a9c34", "traffic": {
                    "protocol": "http"

                }
            }
        }, {
            "data": {
                "id": "0e3f4999f56fda419c414942248cc5f5", "source": "a6e8b9c7251712237a846fcb4284760a", "target": "f8fbc3075ea3918b1a9c47b1543633dc", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "ff94dc24503dd5536c73416bf6e0ed14", "source": "af6ff19432f88bc230bf78e983c56081", "target": "9a0539036cce6825a44e9fe875789edf", "traffic": {
                    "protocol": "http", "rates": {
                        "http": "0.84",
                        "http5xx": "0.84", "httpPercentErr": "100.0", "httpPercentReq": "100.0"
                    }, "responses": {
                        "500": {
                            "flags": {
                                "-": "100.0"
                            },
                            "hosts": {
                                "typhoon.typhoon.svc.cluster.local": "100.0"
                            }
                        }
                    }
                }
            }
        },
        {
            "data": {
                "id": "5eacebd55db22046e6bcf85ca319e050", "source": "b30b0078325bf2e1adb4d57c4c0c2665", "target": "a32230d965e95fe905adfbe5bfa7c39c", "traffic": {
                    "protocol": "http", "rates": {
                        "http": "0.42",
                        "http5xx": "0.42", "httpPercentErr": "100.0", "httpPercentReq": "50.0"
                    }, "responses": {
                        "500": {
                            "flags": {

                                "-": "100.0"
                            },
                            "hosts": {
                                "windcontroller.typhoon.svc.cluster.local": "100.0"
                            }
                        }
                    }
                }
            }
        },
        {
            "data": {
                "id": "8534a09615cf2a013902963c91a9374b", "source": "b30b0078325bf2e1adb4d57c4c0c2665", "target": "ca915b5cac4b04b804de2fb765a400a9", "traffic": {
                    "protocol": "http", "rates": {
                        "http": "0.42",
                        "http5xx": "0.42", "httpPercentErr": "100.0", "httpPercentReq": "50.0"
                    }, "responses": {
                        "500": {
                            "flags": {
                                "-": "100.0"
                            },
                            "hosts": {
                                "raincontroller.typhoon.svc.cluster.local": "100.0"
                            }
                        }
                    }
                }
            }
        },
        {
            "data": {
                "id": "fc2e7bce7b7b96fbc6050b52f71115b2", "source": "bed6f4bd8d0e20ffb966394aaa7a9c34", "target": "acb045f1be03f6c4371523a714b83e98", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "f385fb6c279e7ac155eb06af5558efb2", "source": "c10ceeb7661110bf89efd44bd9135e46", "target": "43630fd327907187cef9ee23e52cd354", "traffic": {
                    "protocol": "http"
                }
            }

        }, {
            "data": {
                "id": "a00adf4e5257b3a9924a8df1ea3c5e4c", "source": "ca915b5cac4b04b804de2fb765a400a9", "target": "a6e8b9c7251712237a846fcb4284760a", "traffic": {
                    "protocol": "http", "rates": {
                        "http": "0.42",
                        "http5xx": "0.42", "httpPercentErr": "100.0", "httpPercentReq": "100.0"
                    }, "responses": {
                        "500": {
                            "flags": {
                                "-": "100.0"
                            },
                            "hosts": {
                                "raincontroller.typhoon.svc.cluster.local": "100.0"
                            }
                        }
                    }
                }
            }
        },
        {
            "data": {
                "id": "6694ad7669bd3a93a1d90c9d53277fff", "source": "e84e6bf4e15960b10f6eded966c440de", "target": "ae59cac7c6f767bc8c1cb7842b2e440c", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "2d7948bffb7d614b550ecb65e47c0f31", "source": "f26ffc7dea2747259e57fb478989f358", "target": "07e178d53947df0378abd561efb478c8", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "adafa76988ef81708d76e5a208e42bce", "source": "f26ffc7dea2747259e57fb478989f358", "target": "87ca1c2da7797b39975588b0fff974b0", "traffic": {
                    "protocol": "http"
                }

            }
        },
        {
            "data": {
                "id": "2404ed40252e42d75f8c0f559f606388", "source": "f26ffc7dea2747259e57fb478989f358", "target": "896e4e9409e5a067776ad551c9102f5f", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "681a42048bac030a5f4c2ed1b5ecfa91", "source": "f26ffc7dea2747259e57fb478989f358", "target": "89e6d075842608e2dcd23697b7276c05", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "f063d646050ad2339d54ef0c6d7db9ae", "source": "f26ffc7dea2747259e57fb478989f358", "target": "af6ff19432f88bc230bf78e983c56081", "traffic": {
                    "protocol": "http", "rates": {
                        "http": "0.42",
                        "http5xx": "0.42", "httpPercentErr": "100.0", "httpPercentReq": "100.0"
                    }, "responses": {
                        "500": {
                            "flags": {
                                "-": "100.0"
                            },
                            "hosts": {
                                "typhoon.typhoon.svc.cluster.local": "100.0"
                            }
                        }
                    }
                }
            }
        },
        {
            "data": {
                "id": "ba6b825166158d2a26624eb253836713", "source": "f26ffc7dea2747259e57fb478989f358", "target": "c10ceeb7661110bf89efd44bd9135e46", "traffic": {
                    "protocol": "http"

                }
            }
        }, {
            "data": {
                "id": "eedf7f0ea2557384878d09f7e0ce2f41", "source": "f26ffc7dea2747259e57fb478989f358", "target": "e84e6bf4e15960b10f6eded966c440de", "traffic": {
                    "protocol": "http"
                }
            }
        },
        {
            "data": {
                "id": "0b742db003d58ac8fdc6502d5c6ec9a8", "source": "f8fbc3075ea3918b1a9c47b1543633dc", "target": "a0ff1e33984425198a16bcdc28951497", "traffic": {
                    "protocol": "http"
                }
            }
        }
        ]
    }
}


export default {
    'GET /mockdata': mockdata
}