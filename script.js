// PRODUTOS

const produtos = [

    {
        nome: "PlayStation 5",
        preco: 4299.90,
        categoria: "Games",
        imagem: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop"
    },

    {
        nome: "Xbox Series X",
        preco: 3899.90,
        categoria: "Games",
        imagem: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=800&auto=format&fit=crop"
    },

    {
        nome: "iPhone 15 Pro",
        preco: 7999.90,
        categoria: "Tecnologia",
        imagem: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop"
    },

    {
        nome: "Notebook Gamer RTX",
        preco: 5499.90,
        categoria: "Tecnologia",
        imagem: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=800&auto=format&fit=crop"
    },

    {
        nome: "Arroz 5KG",
        preco: 28.90,
        categoria: "Mercado",
        imagem: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop"
    },

    {
        nome: "Feijão Carioca",
        preco: 9.99,
        categoria: "Mercado",
        imagem: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=800&auto=format&fit=crop"
    }

];

// ELEMENTOS

const produtosDiv = document.getElementById("produtos");

const carrinhoDiv = document.getElementById("carrinho");

const totalSpan = document.getElementById("total");

let carrinho = JSON.parse(

    localStorage.getItem("carrinhoNovaCore")

) || [];

let desconto = 0;

const frete = 29.90;

// LOGIN / CADASTRO

function mostrarCadastro(){

    document.getElementById("loginForm").classList.add("hidden");

    document.getElementById("cadastroForm").classList.remove("hidden");

}

function mostrarLogin(){

    document.getElementById("cadastroForm").classList.add("hidden");

    document.getElementById("loginForm").classList.remove("hidden");

}

function fazerCadastro(){

    const nome = document.getElementById("cadastroNome").value;

    const email = document.getElementById("cadastroEmail").value;

    const senha = document.getElementById("cadastroSenha").value;

    if(!nome || !email || !senha){

        alert("Preencha todos os campos!");

        return;

    }

    const usuario = {

        nome,
        email,
        senha

    };

    localStorage.setItem(

        "usuarioNovaCore",

        JSON.stringify(usuario)

    );

    alert("Conta criada com sucesso!");

    mostrarLogin();

}

function fazerLogin(){

    const email = document.getElementById("loginEmail").value;

    const senha = document.getElementById("loginSenha").value;

    const usuario = JSON.parse(

        localStorage.getItem("usuarioNovaCore")

    );

    if(!usuario){

        alert("Nenhuma conta cadastrada!");

        return;

    }

    if(

        email === usuario.email &&
        senha === usuario.senha

    ){

        document.getElementById("authContainer").classList.add("hidden");

        document.getElementById("loja").classList.remove("hidden");

        document.getElementById("usuarioLogado").innerText =
            `Bem-vindo, ${usuario.nome}`;

    }else{

        alert("Email ou senha inválidos!");

    }

}

function logout(){

    location.reload();

}

// PRODUTOS

function mostrarProdutos(lista){

    produtosDiv.innerHTML = "";

    lista.forEach((produto,index)=>{

        produtosDiv.innerHTML += `

            <div class="card">

                <img src="${produto.imagem}">

                <h3>${produto.nome}</h3>

                <p>${produto.categoria}</p>

                <p class="preco">

                    R$ ${produto.preco.toFixed(2)}

                </p>

                <button onclick="adicionarCarrinho(${index})">

                    Adicionar

                </button>

            </div>

        `;

    });

}

mostrarProdutos(produtos);

// PESQUISA

function pesquisarProduto(){

    const valor = document
        .getElementById("pesquisa")
        .value
        .toLowerCase();

    const filtrados = produtos.filter(produto =>

        produto.nome.toLowerCase().includes(valor)

    );

    mostrarProdutos(filtrados);

}

// FILTRO

function filtrarCategoria(categoria){

    if(categoria === "Todos"){

        mostrarProdutos(produtos);

        return;

    }

    const filtrados = produtos.filter(produto =>

        produto.categoria === categoria

    );

    mostrarProdutos(filtrados);

}

// CARRINHO

function adicionarCarrinho(index){

    carrinho.push(produtos[index]);

    salvarCarrinho();

    atualizarCarrinho();

}

function salvarCarrinho(){

    localStorage.setItem(

        "carrinhoNovaCore",

        JSON.stringify(carrinho)

    );

}

function atualizarCarrinho(){

    carrinhoDiv.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto,i)=>{

        total += produto.preco;

        carrinhoDiv.innerHTML += `

            <div class="item-carrinho">

                <span>

                    ${produto.nome}

                </span>

                <span>

                    R$ ${produto.preco.toFixed(2)}

                </span>

            </div>

        `;

    });

    total += frete;

    total -= desconto;

    totalSpan.innerText = total.toFixed(2);

}

atualizarCarrinho();

// CUPOM

function aplicarCupom(){

    const cupom = document
        .getElementById("cupom")
        .value
        .toUpperCase();

    if(cupom === "NOVA10"){

        desconto = 10;

        atualizarCarrinho();

        alert("Cupom aplicado!");

    }else{

        alert("Cupom inválido!");

    }

}

// TEMA

function trocarTema(){

    document.body.classList.toggle("light");

}

// FINALIZAR COMPRA

function finalizarCompra(){

    if(carrinho.length === 0){

        alert("Carrinho vazio!");

        return;

    }

    window.open(

        "https://link.mercadopago.com.br/novacorecommerce",

        "_blank"

    );

}