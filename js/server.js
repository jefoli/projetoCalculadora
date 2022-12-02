/*AULA 66 (UDEMY 76) exercício

vamos criar uma facture function para 

*/

function criaCalculadora(){
    return {//vai retornar um objeto
        //atributos - var serão acima:

        display: document.querySelector('.display'),
       
        
        //metodos fica na parte de baixo
        
        inicia(){
            this.cliqueBotoes();
            this.pressionaEnter(); //quando clicar em enter, a calculadora já faz a conta
            this.clearDisplay();
        },

        pressionaBackSpace(){
            this.display.addEventListener('keydown', e => {
                if (e.keyCode === 8){
                    e.preventDefault();
                    this.clearDisplay()
                }
            });
        },

        pressionaEnter() {
            this.display.addEventListener('keyup', e => {
                if (e.keyCode === 13) {
                    this.realizaConta();
                }
            });
        },

        clearDisplay(){
            this.display.value = '';
        },

        apagaUm(){
            this.display.value = this.display.value.slice(0,-1); //usamos slice para remover o último número, caso desejarmos.
        },

        realizaConta(){
            // função perigosa - eval (ele avalia como js - perigoso para risco de segurança) 
            //só vamos usar eval aqui, por conta que não é complexo o exercicio:

            let conta = this.display.value;
            
            try {
                conta = eval(conta);
                if(!conta){ //se a conta for diferente de Nan - não queremos mostrar NaN, mas sim um texto
                    alert('Conta Inválida');
                    return; // para sair da conta
                }
                
                this.display.value = String(conta);

            } catch(e){
                alert('Conta Inválida');
                return;
            }
        },


        
        cliqueBotoes(){//vai pegar o document + click
           //this -> aqui o this é calculadora, quando passa para baixo ela perde a função e quando clicamos ela pega o document. para resolver esse problema adicionamos methods (bind) ou arrow function. perdemos o this por conta do document.

           
            
           //exp SEM arrow function + usando bind:
           /*
           document.addEventListener('click', function(e){
                const el = e.target;       //só vai pegar o que estou clickando na pag
                
                if (el.classList.contains('btn-num')){
                    this.btnParaDisplay(el.innerText);     //isso é um método - precisa de this. fazer um link que está no botao para o display
                        //sempre que queremos referenciar uma chave do objeto dentro do objeto, precisamos da palava this + colocar abaixo do inicia
                }
            }.bind(this)); //<- estamos dizendo para função que ao invés de usar o seu this, utilize o da calculadora.

            //além disso, podemos utilizar arrow function no lugar de bind,pois também fica travado, ja que arrow function não funciona com this.
            */
            //EXP COM ARROW FUNCTION:

            document.addEventListener('click', e => { //desse modo, o this não passa para cá e continua sendo o valor antigo.
                const el = e.target;       //só vai pegar o que estou clickando na pag
                
                if(el.classList.contains('btn-num')){
                    this.btnParaDisplay(el.innerText);     //isso é um método - precisa de this. fazer um link que está no botao para o display
                        //sempre que queremos referenciar uma chave do objeto dentro do objeto, precisamos da palava this + colocar abaixo do inicia
                }
            
                if(el.classList.contains('btn-clear')){
                    this.clearDisplay();
                }
                
                if(el.classList.contains('btn-del')){
                    this.apagaUm();
                }
           
                if(el.classList.contains('btn-eq')){
                    this.realizaConta();
                }
                
                this.display.focus();
            });
        },
        
        btnParaDisplay(valor){
            this.display.value += valor; //desse modo, ele vai concatenar os números clicados no navegador no display
        }
    
    };
}

const calculadora = criaCalculadora();
calculadora.inicia();//esse método que desencadeara os demais


/*
innerText do button é o que está escrito no html
EXP:  o innerText é o numero 4:
<td><button class="btn btn-num">4</button></td>

*/