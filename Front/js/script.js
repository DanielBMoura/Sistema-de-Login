document.addEventListener('DOMContentLoaded', function() {
    // Carrossel
    const sliders = document.querySelectorAll('.slider');
    const btnVoltar = document.getElementById('voltar-button');
    const btnPassar = document.getElementById('passar-button');
    
    let currentSlide = 0;
    let intervalId; // Variável para armazenar o ID do intervalo
    
    function hideSliders() {
        sliders.forEach(item => item.classList.remove('on'));
    }
    
    function showSlider() {
        sliders[currentSlide].classList.add('on');
    }
    
    function nextSlide() {
        hideSliders();
        currentSlide = (currentSlide + 1) % sliders.length;
        showSlider();
    }
    
    function previousSlide() {
        hideSliders();
        currentSlide = (currentSlide - 1 + sliders.length) % sliders.length;
        showSlider();
    }
    
    function startSliderInterval() {
        intervalId = setInterval(nextSlide, 6000); // Muda para o próximo slide a cada 6 segundos
    }
    
    if (btnVoltar && btnPassar) {
        btnVoltar.addEventListener('click', () => {
            previousSlide();
            clearInterval(intervalId); // Limpa o intervalo para evitar mudanças automáticas enquanto o usuário interage
            startSliderInterval(); // Reinicia o intervalo após a interação do usuário
        });
    
        btnPassar.addEventListener('click', () => {
            nextSlide();
            clearInterval(intervalId); // Limpa o intervalo para evitar mudanças automáticas enquanto o usuário interage
            startSliderInterval(); // Reinicia o intervalo após a interação do usuário
        });
    }
    
    if (sliders.length > 0) {
        showSlider();
        startSliderInterval();
    }

    // Mostrar Senha
    const campoSenha = document.querySelector("#campoSenha");
    const botaoMostrarSenha = document.querySelector("#botaoMostrarSenha");
    
    if (campoSenha && botaoMostrarSenha) {
        botaoMostrarSenha.addEventListener("change", function() {
            const estadoAtualDoCampoSenha = campoSenha.getAttribute("type") === "password" ? "text" : "password";
            campoSenha.setAttribute("type", estadoAtualDoCampoSenha);
        });
    }
    
    // Responsividade Navbar
    window.openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
    }
    
    window.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
    };
    
    // Mostrar Div Rebites
    const showRebitesLink = document.getElementById('show-rebites');
    const rebitesDiv = document.getElementById('rebites');
    const closeRebitesButton = document.getElementById('close-rebites');
    const produtosBoDiv = document.querySelector('.produtosBo');
    
    if (showRebitesLink && rebitesDiv && closeRebitesButton) {
        showRebitesLink.addEventListener('click', function(event) {
            event.preventDefault();
            rebitesDiv.style.display = 'flex';
            rebiManualDiv.style.display = 'none';
            rebiHidroDiv.style.display = 'none';
            produtosBoDiv.style.display = 'none';
        });
        
        closeRebitesButton.addEventListener('click', function() {
            rebitesDiv.style.display = 'none';
            produtosBoDiv.style.display = 'flex'; // Volta a exibir produtosBo
        });
    }
    
    // Mostrar Div RebiManual
    const showRebiManualLink = document.getElementById('show-rebiManual');
    const rebiManualDiv = document.getElementById('rebiManual');
    const closeRebiManualButton = document.getElementById('close-rebiManual');
    
    if (showRebiManualLink && rebiManualDiv && closeRebiManualButton) {
        showRebiManualLink.addEventListener('click', function(event) {
            event.preventDefault();
            rebiManualDiv.style.display = 'flex';
            rebitesDiv.style.display = 'none';
            rebiHidroDiv.style.display = 'none';
            produtosBoDiv.style.display = 'none';
        });
        
        closeRebiManualButton.addEventListener('click', function() {
            rebiManualDiv.style.display = 'none';
            produtosBoDiv.style.display = 'flex'; // Volta a exibir produtosBo
        });
    }

    // Mostrar Div RebiHidro
    const showRebiHidroLink = document.getElementById('show-rebiHidro');
    const rebiHidroDiv = document.getElementById('rebiHidro');
    const closeRebiHidroButton = document.getElementById('close-rebiHidro');
    
    if (showRebiHidroLink && rebiHidroDiv && closeRebiHidroButton) {
        showRebiHidroLink.addEventListener('click', function(event) {
            event.preventDefault();
            rebiHidroDiv.style.display = 'flex';
            rebitesDiv.style.display = 'none';
            rebiManualDiv.style.display = 'none';
            produtosBoDiv.style.display = 'none';
        });
        
        closeRebiHidroButton.addEventListener('click', function() {
            rebiHidroDiv.style.display = 'none';
            produtosBoDiv.style.display = 'flex'; // Volta a exibir produtosBo
        });
    }
});


document.querySelector('.cadastro').addEventListener('submit', function(event) {
    event.preventDefault() 

    const nome = document.forms['form']['nome'].value
    const email = document.forms['form']['email'].value
    const senha = document.forms['form']['senha'].value
  
    let formIsValid = true

    if (!nome) { // Bloco de código se nome estiver vazio
        document.getElementById('error-nome').textContent = 'O campo "Nome" deve ser preenchido.'
        formIsValid = false
    } 
    if (!email) { // Bloco de código se email estiver vazio 
        document.getElementById('error-email').textContent = 'O campo "E-mail" deve ser preenchido.'
        formIsValid = false
    }  
    if(!senha) { // Bloco de código se senha estiver vazio
        document.getElementById('error-senha').textContent = 'O campo "Senha" deve ser preenchido.'
        formIsValid = false
    }

    if (!formIsValid) {
        setTimeout(function() {
            document.getElementById('error-nome').textContent = ''
            document.getElementById('error-email').textContent = ''
            document.getElementById('error-senha').textContent = ''
        }, 5000)
    } else {
        // Código para trazer as mensagens do Back-End para o Front-End:
        const form = event.target       
        const formData = new FormData(form)

        fetch(form.action, {
            method: form.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        })
        .then(response => {
            if (!response.ok) { // Código que será executado se o email já estiver cadastrado:
                return response.json().then(result => {
                    document.getElementById('error-message').textContent = result.error

                    setTimeout(() => {
                        document.getElementById('error-message').textContent = ''
                    }, 10000)   // Conta 10 segundos para a mensagem desaparecer
                })
            } else {    // Código que será executado se o cadastro for feito com sucesso:
                function aparecerMsgSucesso() {

                    // Código para fazer animação do sucesso do cadastro:
                    let sucessoCadastro = document.getElementById('container-form')
                
                    response.json().then(result => {
                        document.getElementById('sucess-message').textContent = result.message;
                    })

                    sucessoCadastro.classList.remove('hide')
                    sucessoCadastro.classList.add('show')

                    setTimeout(function() {
                        sucessoCadastro.classList.remove('show');
                        sucessoCadastro.classList.add('hide');
                    }, 3000)    // Conta 3 segundos para a mensagem desaparecer
                }
                aparecerMsgSucesso()    // Executa a função

                setTimeout(function() {
                    window.location.href = '/home'
                }, 4000) // Depois de 4 segundos, muda de tela
            }
        })
    }
})


document.querySelector('.login').addEventListener('submit', function(event) {
    event.preventDefault()

    const email = document.forms['login-form']['email'].value
    const senha = document.forms['login-form']['senha'].value

    let envioForm = true

    if (!email) {
        document.getElementById('error-email').textContent = 'O campo "E-mail" deve ser preenchido'
        envioForm = false
    }
    if (!senha) {
        document.getElementById('error-senha').textContent = 'O campo "Senha" deve ser preenchido'
        envioForm = false
    }

    if (!envioForm) {
        setTimeout(function(){
            document.getElementById('error-email').textContent = ''
            document.getElementById('error-senha').textContent = ''
        }, 5000)
    } else {
        const form = event.target       
        const formData = new FormData(form)

        fetch(form.action, {
            method: form.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        })
        .then(response => {
            if (response.ok) {
                response.json().then(result => {
                    function aparecerMsgSucesso() {
                        let sucessoCadastro = document.getElementById('container-form')

                        document.getElementById('error-mensagem').textContent = ''
                        document.getElementById('sucess-message').textContent = result.message

                        sucessoCadastro.classList.remove('hide')
                        sucessoCadastro.classList.add('show')

                        setTimeout(function() {
                            sucessoCadastro.classList.remove('show');
                            sucessoCadastro.classList.add('hide');
                        }, 3000)
                    }
                    aparecerMsgSucesso()
                })
                setTimeout(function() {
                    window.location.href = '/home'
                }, 4000)
            } else {
                return response.json().then(result => {
                    if (result.error === 'E-mail não reconhecido') {
                        document.getElementById('error-message').textContent = result.error
                        setTimeout(function() {
                        document.getElementById('error-message').textContent = ''
                        }, 3000)
                    } else {
                        function aparecerMsgErro() {
                            let sucessoCadastro = document.getElementById('container-form')
                        
                            document.getElementById('error-mensagem').textContent = result.error
        
                            sucessoCadastro.classList.remove('hide')
                            sucessoCadastro.classList.add('show')
        
                            setTimeout(function() {
                                sucessoCadastro.classList.remove('show');
                                sucessoCadastro.classList.add('hide');
                            }, 3000)
                        }
                        aparecerMsgErro()
                    }
                })
            }
        })
    }
})