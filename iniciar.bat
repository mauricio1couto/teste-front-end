@echo off
chcp 65001 >nul
title Econverse - servidor de desenvolvimento
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  [ERRO] Node.js nao encontrado.
  echo  Instale a versao LTS em https://nodejs.org e rode este arquivo de novo.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo.
  echo  Instalando dependencias ^(so na primeira vez, pode levar 1 minuto^)...
  echo.
  call npm.cmd install
  if errorlevel 1 (
    echo.
    echo  [ERRO] Falha ao instalar as dependencias.
    pause
    exit /b 1
  )
)

echo.
echo  Iniciando o projeto. O navegador vai abrir sozinho.
echo  Para encerrar, feche esta janela ou aperte Ctrl+C.
echo.
call npm.cmd run dev
pause
