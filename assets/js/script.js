function registroServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
                .then(function () {
                    console.log('service worker registered');
                })
                .catch(function () {
                    console.warn('service worker failed');
                });
    }
}

function inserirValor(valor) {
    var campo = document.querySelector("input[type='text']");
    if (campo.value === "") {
        campo.value = valor;
    } else {
        var valorAntigo = campo.value;
        campo.value = valorAntigo + "" + valor;
    }
    console.log(valor);
}

function limpar() {
    var campo = document.querySelector("input[type='text']").value = "";
}

function calcular() {
    var campo = document.querySelector("input[type='text']").value;
    var aux = campo.split("+");
    if (aux.length === 2) {
        resultado(aux, "+");
    } else {
        aux = campo.split("-");
        if (aux.length === 2) {
            resultado(aux, "-");
        } else {
            aux = campo.split("x");
            if (aux.length === 2) {
                resultado(aux, "x");
            } else {
                aux = campo.split("/");
                if (aux.length === 2) {
                    resultado(aux, "/");
                }
            }
        }
    }
}

function resultado(valores, sinal) {
    var numero1 = Number(valores[0]);
    var numero2 = Number(valores[1]);

    var campo = document.querySelector("input[type='text']");
    var antigoValor = campo.value;
    if (sinal === "+") {
        var valorFinal = numero1 + numero2;
        campo.value = antigoValor + "=" + valorFinal.toString();
    } else if (sinal === "-") {
        var valorFinal = numero1 - numero2;
        campo.value = antigoValor + "=" + valorFinal.toString();
    } else if (sinal === "/") {
        var valorFinal = numero1 / numero2;
        campo.value = antigoValor + "=" + valorFinal.toString();
    } else if (sinal === "x") {
        var valorFinal = numero1 * numero2;
        campo.value = antigoValor + "=" + valorFinal.toString();
    }
}

window.onload = function () {
    document.querySelector("#um").addEventListener("click", function () {
        inserirValor(1);
    }, false);
    document.querySelector("#dois").addEventListener("click", function () {
        inserirValor(2);
    }, false);
    document.querySelector("#tres").addEventListener("click", function () {
        inserirValor(3);
    }, false);
    document.querySelector("#quatro").addEventListener("click", function () {
        inserirValor(4);
    }, false);
    document.querySelector("#cinco").addEventListener("click", function () {
        inserirValor(5);
    }, false);
    document.querySelector("#seis").addEventListener("click", function () {
        inserirValor(6);
    }, false);
    document.querySelector("#sete").addEventListener("click", function () {
        inserirValor(7);
    }, false);
    document.querySelector("#oito").addEventListener("click", function () {
        inserirValor(8);
    }, false);
    document.querySelector("#nove").addEventListener("click", function () {
        inserirValor(9);
    }, false);
    document.querySelector("#multiplicacao").addEventListener("click", function () {
        inserirValor("x");
    }, false);
    document.querySelector("#divisao").addEventListener("click", function () {
        inserirValor("/");
    }, false);
    document.querySelector("#subtracao").addEventListener("click", function () {
        inserirValor("-");
    }, false);
    document.querySelector("#soma").addEventListener("click", function () {
        inserirValor("+");
    }, false);
    document.querySelector("#limpar").addEventListener("click", limpar, false);
    document.querySelector("#calcular").addEventListener("click", calcular, false);
    registroServiceWorker();
}
;
