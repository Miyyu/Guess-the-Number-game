var numeroAleatorio= Math.floor(Math.random() * 100) + 1; //Gerando numero aleatório

var palpites = document.querySelector('.valoresAnteriores'); //Atribuindo  valores para os p da div
var certoOUerrado = document.querySelector('.certoOUerrado');
var dica = document.querySelector('.dica');

var envioPalpite = document.querySelector('.submitPalpite'); //atribuindo valor para o botão de envio
var valorPalpite = document.querySelector('.campoPalpite'); //atribuindo a caixa de texto

var contPalpites = 1; //iniciar a quantidade de vezes de jogadas
var botaoReinicio;
var numerosJogados = [];

function conferirPalpite(){ //conferir o valor digitado pelo usuário
    var palpiteUsuario = Number(valorPalpite.value); //recebe o valor digitado e faz com que seja um number

    if(palpiteUsuario < 1 || palpiteUsuario > 100 || isNaN(palpiteUsuario)){ //verificando se o valor está ente 1 e 100 e se é um numero - isNaN irá retornar um boolean dizendo se o valor é um NaN
        window.alert("Insira apenas valores de 1 a 100!");
        contPalpites--;
    }
    else if(numerosJogados.indexOf(palpiteUsuario) !== -1){ //verificando se o valor digitado está contido dentro do array. Logo, se seu indice for != -1, ele está contido
        window.alert("Valor repetido! Você já inseriu esse valor.");
        contPalpites--;
    }
    else{
        numerosJogados.push(palpiteUsuario);

        if(contPalpites === 1){ //se a quantidade de jogadas for = 1, coloca as info que estavam ocultadas
            palpites.textContent = 'Valores Anteriores: '; //.textcontent serve para atribuir texto
        }
        palpites.textContent += palpiteUsuario + " "; // concatenando o que foi digitado com o que tava antes

        if(palpiteUsuario === numeroAleatorio){ //verificando as jogadas
            certoOUerrado.textContent = 'PARABÉNS! VOCÊ ACERTOU.';
            certoOUerrado.style.backgroundColor = 'green'; //deixa o fundo de onde está o p certoOUerrado verde
            dica.textContent = ''; //sumindo com as dicas
            fimDeJogo();
        }
        else if(contPalpites === 10){ //verifica se o usuário jogou 10x
            certoOUerrado.textContent = 'Você perdeu! O número era ' + numeroAleatorio;
            certoOUerrado.style.backgroundColor = 'grey'; //deixa o fundo cinza
            dica.textContent = '';
            fimDeJogo();
        }
        else{ //se não excedeu o limite de jogas e não está certo
            certoOUerrado.textContent = 'Errado!';
            certoOUerrado.style.backgroundColor = 'red';

            if(palpiteUsuario < numeroAleatorio){ //verifica se o palpite do usuário está abaixo do valor gerado
                dica.textContent = 'Palpite baixo';
            }
            else if(palpiteUsuario > numeroAleatorio){
                dica.textContent = 'Palpite alto';
            }
        }
    }            
                
    contPalpites++; //incremento a contagem das jogadas
    campoPalpite.value = ''; //zero o campo de palpite para digitar
    campoPalpite.focus(); //focar no campo de palpite
}

envioPalpite.addEventListener('click', conferirPalpite); //adicionando um evento para o botão de submit palpite, onde passamos 2 parametros, sendo que a função conferirPalpite é acionada se houver um clique no botão submit

function fimDeJogo(){
    envioPalpite.disabled = true; //desabilitando o campo palpite para não ser inserido mais nada, disable = true
    valorPalpite.disabled = true;
    botaoReinicio = document.createElement('button'); //criando um novo botão e inserindo no final do body.
    botaoReinicio.textContent = 'Iniciar novo jogo';
    document.body.appendChild(botaoReinicio); //"Adiciona um nó ao final da lista de filhos de um nó pai especificado."
    botaoReinicio.addEventListener('click', reiniciarJogo); //add evento de clique para chamar a função renicarJogo       
}

function reiniciarJogo(){
    contPalpites = 1;
    numerosJogados = [];

    var reinicarDiv = document.querySelectorAll('.palpite p'); //criando variável para reiniciar a div dos palpites, selecioando tudo que estiver nessa div, não esquecendo de colocar o p em seguida
    
    for(var i = 0; i < reinicarDiv.length; i++){ //for para percorrer a div, com o tamanho dos argumentos que ela tem
        reinicarDiv[i].textContent = ''; //zerando os textos de cada indice da div Palpites
    }

    botaoReinicio.parentNode.removeChild(botaoReinicio); //removendo o botão de reinicio

    envioPalpite.disabled = false; //habilitando o input e o botão
    valorPalpite.disabled = false;
    valorPalpite.value = ''; //zerando campo palpite
    valorPalpite.focus();

    certoOUerrado.style.backgroundColor = 'white'; //retornando o fundo do certoOUerrado para branco
    numeroAleatorio = Math.floor(Math.random() * 100) + 1; //gerando outro numero aleatorio;
}