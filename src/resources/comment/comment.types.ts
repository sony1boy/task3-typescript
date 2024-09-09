export interface OrderDTO {
    id?: string;
    post: string;
    createdAt: string;
    text: string;
    user: string;
    }
    
    export interface OrderResponse {
      id: string;
      post: string;
      createdAt: string;
      text: string;
      user?: string;
    }
    