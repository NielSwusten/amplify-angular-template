import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { Injectable } from '@angular/core';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { FormsModule } from '@angular/forms';
import { SentimentService } from '../sentiment.service';

const client = generateClient<Schema>();

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule,  AmplifyAuthenticatorModule, FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {

  sentiment: string | undefined;
  textToAnalyze: string = '';

  todos: any[] = [];

  ngOnInit(): void {
    this.listTodos();
  }
  constructor(private sentimentService: SentimentService) { }

  private client = generateClient<Schema>();

  analyzeText(text: string) {
    this.sentimentService.analyzeSentiment(text).then(result => {
      if (typeof result === 'string') {
        this.sentiment = result;
      } else {
        this.sentiment = undefined;
      }
      console.log('The sentiment of the text is:', this.sentiment);
    }).catch(error => {
      console.error('Error analyzing sentiment:', error);
      this.sentiment = undefined;
    });
  }



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
