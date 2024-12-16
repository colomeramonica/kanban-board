<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasks = [
            [
                'title' => 'Desenvolvimento de Protótipo',
                'description' => 'Criar um protótipo funcional da nova funcionalidade do produto para apresentação aos stakeholders é uma tarefa crucial que requer atenção aos detalhes e uma execução precisa. O protótipo deve incluir todas as funcionalidades essenciais que demonstram claramente o valor agregado e a inovação que a nova funcionalidade traz para o produto. Além disso, é importante que o protótipo seja intuitivo e fácil de entender, permitindo que os stakeholders visualizem como a funcionalidade será integrada no produto final. A apresentação deve ser bem estruturada, destacando os principais benefícios e mostrando exemplos práticos de uso. A preparação adequada e a prática da apresentação também são essenciais para garantir que todas as perguntas dos stakeholders sejam respondidas de maneira eficaz. Este processo não só facilita a compreensão da nova funcionalidade, mas também ajuda a obter o feedback necessário para ajustes e melhorias antes do lançamento oficial.',
                'date' => '2025-07-26',
                'stage' => 'todo'
            ],
            [
                'title' => 'Pesquisa de Mercado',
                'description' => 'Realizar uma pesquisa detalhada sobre as tendências do mercado atual para identificar novas oportunidades de negócios',
                'date' => '2025-07-27',
                'stage' => 'ideas'
            ],
            [
                'title' => 'Implementaçãod de API',
                'description' => 'Desenvolvedor e integrar a API de autenticação com o sistema atual, garantindo a segurança dos dados',
                'date' => '2025-07-28',
                'stage' => 'doing'
            ],
            [
                'title' => 'Teste de Usabilidade',
                'description' => 'Realizar testes de usabilidade com usuários finais para avaliar a experiência de uso da nova interface',
                'date' => '2025-07-29',
                'stage' => 'done'
            ],
        ];

        foreach ($tasks as $task) {
            Task::create($task);
        }
    }
}
