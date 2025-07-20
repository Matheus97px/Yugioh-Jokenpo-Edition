# 🃏 Yu-Gi-Oh! Jo-Ken-Po Edition

Este é um mini-jogo inspirado no universo de *Yu-Gi-Oh!* combinado com a clássica mecânica de **Pedra, Papel e Tesoura**. Escolha sua carta, desafie o computador e vença o duelo!

## acesse e veja 
https://matheus97px.github.io/Yugioh-Jokenpo-Edition/


## 🎮 Como Jogar

1. Ao iniciar, você verá um deck com 5 cartas.
2. Passe o mouse sobre uma carta para ver seus detalhes.
3. Clique na carta desejada para jogar.
4. O computador também jogará uma carta aleatória.
5. As regras seguem a lógica de Pedra, Papel e Tesoura:
   - **Dragão Branco de Olhos Azuis** (*Paper*) vence o **Mago Negro** (*Rock*)
   - **Mago Negro** (*Rock*) vence o **Exodia** (*Scissors*)
   - **Exodia** (*Scissors*) vence o **Dragão Branco de Olhos Azuis** (*Paper*)

## 🧠 Lógica

Cada carta possui um tipo (`Rock`, `Paper`, `Scissors`) e define quem ela vence e para quem ela perde com base em arrays `WinOf` e `LoseOf` dentro do código:


