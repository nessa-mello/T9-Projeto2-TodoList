window.addEventListener('DOMContentLoaded', function () {

    const input = document.querySelector('#todoInput')
    const lista = document.querySelector('#todoLista')
    const botao = document.querySelector('#todoSubmit')
    const botaoMarcarTodos = document.querySelector('#todoMarcarTodos')
    const botaoRemoverTodos = document.querySelector('#todoRemoverTodos')
    let dragging = ''
    // constante botão para chamar o botão no JS. 

    botao.addEventListener('click', inserirItem)


    function inserirItem(event) {
        event.preventDefault();
        // O botão preventDefault previne que um evento aconteça, antes de outras coisas sejam executadas.. Previne o comportamento padrão da função.
        if (input.value == null || input.value == '') {
            alert('Inserir informação válida');
        } else {
            const item = document.createElement('li')
            // criando elemento

            const div = document.createElement('div')
            // Criamos uma div, para inserir botão e marcação
            div.classList.add('divDeRemocao')
            // Aqui criamos uma class para nossa div, para que possamos remover apenas o botão e itens do botão "RemoverTodos".

            const removeBotao = document.createElement('button')
            // Criamos elemento botão.

            //----------------------------------------------------------
            // Inserções gerais - adicionado
            item.innerText = input.value;
            // aqui o que o usuário colocar na caixa input, ele pegara o 'value' o valor que o usuário colocar
            removeBotao.innerText = 'x';
            // Meu botão recebe dentro do texto "x"
            div.appendChild(item)
            div.appendChild(removeBotao)

            // estilizando a div
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';

            // inserindo a div dentro da lista (ul)
            lista.appendChild(div)
            // inserindo texto e botão. 
            //----------------------------------------------------------
            // Eventos
            removeBotao.addEventListener('click', function () {
                lista.removeChild(div)
            })

            //adicionando esse botão eu tenho um evento que chama a função para remover a lista que é o pai das 'divs' que foram criadas com o item e botão

            item.addEventListener('click', function () {
                // regra para click no texto do botão
                // item.style.textDecoration = 'line-through'
                if (item.style.textDecoration == 'line-through') {
                    item.style.textDecoration = 'none'
                } else {
                    item.style.textDecoration = 'line-through'
                }
            })

            //------------------------------------------------------------------
                                //Inicio Drag & Drop

            item.setAttribute('draggable', 'true');
            // Atribuindo o draggable para os meus itens

            lista.addEventListener('dragstart', function (e) {
                dragging = e.target.closest('.divDeRemocao')
            })
            // 

            lista.addEventListener('dragover', function (e) {
                e.preventDefault()

                const node = e.target.closest('.divDeRemocao')

                this.insertBefore(dragging, node)
            })

            lista.addEventListener('dragend', function (e) {
                dragging = null
            })
        }
    }


    //evento para excluir todas as tarefas

    botao.addEventListener('click', function () {
        //adicionando a função change para quando ele mudar o botão ficar vazio
        document.querySelector('input').value = '';
    })


    todoMarcarTodos.addEventListener('click', function () {
        //Quando eu clicar no botão selecionado eu quero que ele pegue todos os itens da lista e percorra essa lista e risque todos os itens

        const li = document.querySelectorAll('li')
        // O querySelectorAll faz com que eu percorra todos os itens da lista
        for (let i = 0; i < li.length; i++) {
            li[i].style.textDecoration = 'line-through'
        }
    })
    todoRemoverTodos.addEventListener('click', function () {
        //QUando eu clicar no botão indicado, eu quero que ele pegue minha div e os dois itens que criei com um clique.
        const div = document.querySelectorAll('.divDeRemocao')

        for (let i = 0; i < div.length; i++) {
            div[i].style.display = 'none'
        }
    })
})