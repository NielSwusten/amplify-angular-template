import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { Injectable } from '@angular/core';


const client = generateClient<Schema>();

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  todos: any[] = [];

  ngOnInit(): void {
    this.listTodos();
  }
  private client = generateClient<Schema>();


  // async analyzeSentiment(text: string): Promise<void> {
  //   try {
  //     const result = await this.client.interpretSentiment({ text }); // <-- Call function directly
  //     console.log('Sentiment Analysis Result:', result);
  //   } catch (error) {
  //     console.error('Error analyzing sentiment:', error);
  //   }
  // }

  listTodos() {
    try {
      client.models.Todo.observeQuery().subscribe({
        next: ({ items, isSynced }) => {
          this.todos = items;
        },
      });
    } catch (error) {
      console.error('error fetching todos', error);
    }
  }

  createTodo() {
    try {
      client.models.Todo.create({
        content: window.prompt('Todo content'),
      });
      this.listTodos();
    } catch (error) {
      console.error('error creating todos', error);
    }
  }

    
  
  deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }
}
