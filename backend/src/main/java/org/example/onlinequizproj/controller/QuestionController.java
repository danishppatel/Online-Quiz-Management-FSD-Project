package org.example.onlinequizproj.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.onlinequizproj.model.Question;
import org.example.onlinequizproj.service.QuestionService;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
@CrossOrigin(origins =  "http://localhost:5173")
public class QuestionController {
    private final QuestionService questionService;

    @PostMapping("/create-new-question")
    public ResponseEntity<Question> createQuestion(@Valid @RequestBody Question question){
        Question createdQuestion = questionService.createQuestion(question);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuestion);
    }

    @GetMapping("/all-questions")
    public ResponseEntity<List<Question>> getAllQuestions(){
        List<Question> questions =  questionService.getAllQuestions();

        return ResponseEntity.ok(questions);
    }

    @GetMapping("/question/{id}")
    public  ResponseEntity<Question> getQuestionById(@PathVariable Long id)
            throws ChangeSetPersister.NotFoundException {

        Optional<Question> theQuestion =  questionService.getQuestionById(id);

        if(theQuestion.isPresent()){
            return ResponseEntity.ok(theQuestion.get());
        }else{
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    @PutMapping("/question/{id}/update")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Long id, @RequestBody Question question) throws ChangeSetPersister.NotFoundException {

        Question updatedQuestion =  questionService.updateQuestion(id, question);

        return ResponseEntity.ok(updatedQuestion);
    }

    @DeleteMapping("/question/{id}/delete")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id){
        questionService.deleteQuestion(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/subjects")
    public ResponseEntity<List<String>> getSubjects(){
        List<String> subjects = questionService.getAllSubjects();

        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/quiz/fetch-questions-for-user")
    public ResponseEntity<List<Question>> getQuestionForUser(
            @RequestParam Integer numOfQuestions, @RequestParam String subject){
        try {

            List<Question> allQuestions = questionService.getQuestionForUser(numOfQuestions, subject);
            List<Question> mutableQuestions = new ArrayList<>(allQuestions);

            Collections.shuffle(mutableQuestions);

            int availableQuestions = Math.min(numOfQuestions, mutableQuestions.size());
            List<Question> randomQuestions = mutableQuestions.subList(0, availableQuestions);

            return ResponseEntity.ok(randomQuestions);
        } catch (Exception e) {
            // System.err.println("Error in getQuestionForUser: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
