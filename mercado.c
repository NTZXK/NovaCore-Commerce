#include <stdio.h>
#include <string.h>

int main() {

    // =========================
    // PRODUTOS
    // =========================

    char produtos[5][30] = {
        "Coca-Cola",
        "Arroz",
        "Mouse",
        "Teclado",
        "Chocolate"
    };

    float precos[5] = {
        8.0,
        25.0,
        60.0,
        120.0,
        7.5
    };

    int estoque[5] = {
        10,
        20,
        5,
        3,
        15
    };

    // =========================
    // CARRINHO
    // =========================

    int carrinho[5] = {0};

    int opcao = 0;
    int produto;
    int quantidade;

    float total = 0;

    // =========================
    // MENU PRINCIPAL
    // =========================

    while(opcao != 5){

        printf("\n=========================\n");
        printf("      MERCADO ADS\n");
        printf("=========================\n");

        printf("1 - Ver Produtos\n");
        printf("2 - Adicionar ao Carrinho\n");
        printf("3 - Ver Carrinho\n");
        printf("4 - Caixa\n");
        printf("5 - Sair\n");

        printf("\nEscolha uma opcao: ");
        scanf("%d", &opcao);

        // =========================
        // VER PRODUTOS
        // =========================

        if(opcao == 1){

            printf("\n===== PRODUTOS =====\n");

            for(int i = 0; i < 5; i++){

                printf("%d - %s | R$ %.2f | Estoque: %d\n",
                       i + 1,
                       produtos[i],
                       precos[i],
                       estoque[i]);
            }
        }

        // =========================
        // ADICIONAR CARRINHO
        // =========================

        else if(opcao == 2){

            printf("\n===== PRODUTOS =====\n");

            for(int i = 0; i < 5; i++){

                printf("%d - %s | R$ %.2f | Estoque: %d\n",
                       i + 1,
                       produtos[i],
                       precos[i],
                       estoque[i]);
            }

            printf("\nDigite o numero do produto: ");
            scanf("%d", &produto);

            produto--;

            if(produto >= 0 && produto < 5){

                printf("Quantidade: ");
                scanf("%d", &quantidade);

                if(quantidade <= estoque[produto]){

                    carrinho[produto] += quantidade;

                    estoque[produto] -= quantidade;

                    printf("Produto adicionado!\n");
                }

                else{
                    printf("Estoque insuficiente!\n");
                }
            }

            else{
                printf("Produto invalido!\n");
            }
        }

        // =========================
        // VER CARRINHO
        // =========================

        else if(opcao == 3){

            printf("\n===== CARRINHO =====\n");

            total = 0;

            for(int i = 0; i < 5; i++){

                if(carrinho[i] > 0){

                    float subtotal = carrinho[i] * precos[i];

                    printf("%s | Quantidade: %d | Subtotal: R$ %.2f\n",
                           produtos[i],
                           carrinho[i],
                           subtotal);

                    total += subtotal;
                }
            }

            printf("\nTOTAL: R$ %.2f\n", total);
        }

        // =========================
        // CAIXA
        // =========================

        else if(opcao == 4){

            float pagamento;
            float troco;

            total = 0;

            printf("\n===== CAIXA =====\n");

            for(int i = 0; i < 5; i++){

                if(carrinho[i] > 0){

                    float subtotal = carrinho[i] * precos[i];

                    printf("%s | %d x %.2f = %.2f\n",
                           produtos[i],
                           carrinho[i],
                           precos[i],
                           subtotal);

                    total += subtotal;
                }
            }

            printf("\nTOTAL: R$ %.2f\n", total);

            printf("Valor pago: ");
            scanf("%f", &pagamento);

            troco = pagamento - total;

            printf("Troco: R$ %.2f\n", troco);

            // LIMPAR CARRINHO

            for(int i = 0; i < 5; i++){
                carrinho[i] = 0;
            }

            printf("Compra finalizada!\n");
        }

        // =========================
        // SAIR
        // =========================

        else if(opcao == 5){

            printf("\nEncerrando sistema...\n");
        }

        // =========================
        // ERRO
        // =========================

        else{

            printf("\nOpcao invalida!\n");
        }
    }

    return 0;
}